import React from 'react';
import axios from 'axios';

import SnackBar from "./components/SnackBar";

import { api_web_address } from "./global"

const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//function to fetch products according to pagination
    export const fetchProducts = async ( api_endpoint ) => {
	//sending rqst to api
		try {
			const request_address = api_web_address + api_endpoint;
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