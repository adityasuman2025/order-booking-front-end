import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import CryptoJS from 'crypto-js';

import { api_url_address, encryption_key, cookie_expiration_time } from "./global"
const cookies = new Cookies();

const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//function to get a cookie value, decrypt it and return real value
	export const getDecryptedCookieValue = async ( cookie_name ) => {
		let value = null;
		try {
			const cookie_value = await cookies.get(cookie_name);
			if( cookie_value ) {
				const decrypted = await CryptoJS.AES.decrypt( cookie_value, encryption_key );
				value = await CryptoJS.enc.Utf8.stringify(decrypted);
			}
		} catch {
			value = null;
		}

		return value;
	}

//function to set cookie after encrypting the value
	export const makeEncryptedCookie = async ( key, value ) => {
		try {
			const encrypted_value = await CryptoJS.AES.encrypt( value, encryption_key ).toString();
			await cookies.set( key, encrypted_value, { path: "/", expires: cookie_expiration_time });

			return true;
		} catch {
			return false;
		}
	}
//function to validate name, contact no and email
	export const validateUsername = ( name ) => {
		var re = /^[a-zA-Z]*$/;
		return re.test( name );
	}

	export const validateContactNo = ( number ) => {
		var re = /^[0-9]*$/;
		return re.test( number );
	}

//function to fetch products according to pagination
    export const fetchProducts = async ( api_endpoint ) => {
	//sending rqst to api
		try {
			const request_address = api_url_address + api_endpoint;
			const response = await axios.get( request_address );
			
		//getting resp from sent rqst
			if( response ) {
				const resp = await response.data;

				const results = resp.results;
				if( results ) {
					return resp;
				}
			}
		} catch {
			// makeSnackBar( "something went wrong", "error" );
		}

		return null;
	}

//function to check if a user exist with a phone number
	export const checkUserExistsWithGivenPhoneNumber = async ( phone_no ) => {
	//sending rqst to api
		try {
			const api_endpoint = "check-user-with-phone-no-exists/?phone_no=" + phone_no;
			const request_address = api_url_address + api_endpoint;
			const response = await axios.get( request_address );
			
		//getting resp from sent rqst
			if( response ) {
				const resp = await response.data;

				const error = resp.error;
				if( error == 0 ) {
					return 1; //user exists with that phone no
				} else if( error == 1 ) {
					return 0; //user does not exists
				}
			}
		} catch {
			// makeSnackBar( "something went wrong", "error" );
		}

		return null;
	}

//function to create a user
    export const createUser = async ( first_name, last_name, phone ) => {
	//sending rqst to api
		try {
			const request_address = api_url_address + "users/";
			const response = await axios.post( request_address, {
				first_name: first_name,
				last_name: last_name,
				phone: phone
			});

		//getting resp from sent rqst
			if( response ) {
				const resp = await response.data;

				const error = resp.error;
				if( error == 0 ) {
					return 1;
				}
			}
		} catch {
			// makeSnackBar( "something went wrong", "error" );
		}

		return null;
	}

//function to fetch all cities
	export const fetchCities = async () => {
	//sending rqst to api
		try {
			const request_address = api_url_address + "cities/";
			const response = await axios.get( request_address );
			
		//getting resp from sent rqst
			if( response ) {
				const resp = await response.data;

				const error = resp.error;
				if( error == 0 ) {
					return resp.resp;
				}
			}
		} catch {
			// makeSnackBar( "something went wrong", "error" );
		}

		return null;
	}

//function to book an order of the user
	export const BookUserOrder = async ( user_phone_no, product_id, city_id ) => {
	//sending rqst to api
		try {
			const request_address = api_url_address + "orders/";
			const response = await axios.post( request_address, {
				user: user_phone_no,
				product: product_id,
				city: city_id
			});

		//getting resp from sent rqst
			if( response ) {
				const resp = await response.data;

				const error = resp.error;
				if( error == 0 ) {
					return 1;
				}
			}
		} catch {
			// makeSnackBar( "something went wrong", "error" );
		}

		return null;
	}

//function to fetch today's top bottom cities
	export const fetchTodaysTopBottomCities = async () => {
	//sending rqst to api
		try {
			const request_address = api_url_address + "todays-top-bottom-cities/";
			const response = await axios.get( request_address );
			
		//getting resp from sent rqst
			if( response ) {
				const resp = await response.data;

				const error = resp.error;
				if( error == 0 ) {
					return resp.resp;
				}
			}
		} catch {
			// makeSnackBar( "something went wrong", "error" );
		}

		return null;
	}

//function to fetch weekly top bottom cities
	export const fetchWeeklyTopBottomCities = async () => {
	//sending rqst to api
		try {
			const request_address = api_url_address + "weekly-top-bottom-cities/";
			const response = await axios.get( request_address );
			
		//getting resp from sent rqst
			if( response ) {
				const resp = await response.data;

				const error = resp.error;
				if( error == 0 ) {
					return resp.resp;
				}
			}
		} catch {
			// makeSnackBar( "something went wrong", "error" );
		}

		return null;
	}

//function to create a product
	export const createProduct = async ( name, description, price ) => {
	//sending rqst to api
		try {
			const request_address = api_url_address + "products/";
			const response = await axios.post( request_address, {
				name: name,
				description: description,
				price: price
			});

		//getting resp from sent rqst
			if( response ) {
				const resp = await response.data;

				const error = resp.error;
				if( error == 0 ) {
					return 1;
				}
			}
		} catch {
			// makeSnackBar( "something went wrong", "error" );
		}

		return null;
	}

//function to fetch orders by city according to pagination
	export const fetchOrdersByCity = async ( api_endpoint ) => {
	//sending rqst to api
		try {
			const request_address = api_url_address + api_endpoint;
			const response = await axios.get( request_address );
			
		//getting resp from sent rqst
			if( response ) {
				const resp = await response.data;

				const results = resp.results;
				if( results ) {
					return resp;
				}
			}
		} catch {
			// makeSnackBar( "something went wrong", "error" );
		}

		return null;
	}

//10 Jan '20, 5 PM //also converts UTC date-timeof db into local date-time
	export const formatDateTime = (dateStr) => {
		if( dateStr == null || dateStr == undefined ) {
			return "";
		}
		
	//getting date from recieved date in this function 
		let time = formatLocalTimeFromDateTime(dateStr);
		let formattedTime = formatTime(time);

	//returning result
		let date = formatDate4(dateStr);

		let result = date + ", " + formattedTime;
		return result;
	}

//10 Jan '20
	export const formatDate4 = (dateStr) => {
		if( dateStr == null || dateStr == undefined ) {
			return "";
		}

		if (isValidTimestamp(dateStr * 1000)) {
			dateStr = new Date(dateStr * 1000);
		}
		var d = new Date(dateStr);
		var month = d.getUTCMonth().toString();
		var day = d.getUTCDate().toString();
		var year = d.getUTCFullYear().toString();

		var yearLen = year.length;

		if( day.length < 2 ) {
			//to add a extra 0 for case of single digit date
			day = "0" + day;
		}

		return (day + " " + monthList[ month ] + " '" + year.substring(yearLen-2, yearLen));
	}

//09:45:23.123
	export const formatLocalTimeFromDateTime = (dateStr) => {
		if( dateStr == null || dateStr == undefined ) {
			return "";
		}

		const date = new Date( dateStr );

		var hour = '' + date.getHours();
		var min = '' + date.getMinutes();
		var sec = '' + date.getSeconds();
		var millis = '' + date.getMilliseconds();

		if( hour.length < 2 ) {
			hour = '0' + hour;
		}
		if( min.length < 2 ) {
			min = '0' + min;
		}
		if( sec.length < 2 ) {
			sec = '0' + sec;
		}
		if( millis.length < 2) {
			millis = '00' + millis;
		} else if ( millis.length < 3 ) {
			millis = '0' + millis;
		}

		const timeStr = [hour, min, sec].join(":") + "." + millis;
		return timeStr;
	}

// 17:20*** -> 5:20 PM && 17:00 -> 5 PM
	export const formatTime = (time) => {
		if( time == null || time == undefined ) {
			return "";
		}

		var hours = time.substring(0, 2);
		var minutes = time.substring(3, 5);
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours > 12 ? hours - 12 : hours;
		minutes = minutes.length < 2 ? '0' + minutes : minutes;
		// minutes is now a string
		if (minutes.length > 0 && minutes != '0' && minutes != '00') {
			var strTime = hours + ':' + minutes + ' ' + ampm;
			return strTime;
		} else {
			var strTime = hours + ' ' + ampm;
			return strTime;
		}
	}

//helper function for time date calculation
	function isValidTimestamp(_timestamp) {
		const newTimestamp = new Date(_timestamp).getTime();
		return isNumeric(newTimestamp);
	}

	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}