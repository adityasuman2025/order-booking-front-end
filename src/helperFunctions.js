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
