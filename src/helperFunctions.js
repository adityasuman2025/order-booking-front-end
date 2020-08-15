import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import CryptoJS from 'crypto-js';

import SnackBar from "./components/SnackBar";

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