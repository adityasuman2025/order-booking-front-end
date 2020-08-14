import React from 'react';
import axios from 'axios';

import SnackBar from "./components/SnackBar";

import { api_url_address } from "./global"

const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//function to fetch products according to pagination
    export const fetchProducts = async ( api_link ) => {
	//sending rqst to api
		try {
			const request_address = api_url_address + api_link;
			const response = await axios.get( request_address );
			
		//getting resp from sent rqst
			if( response ) {
				console.log(response);
				const resp = await response.data;

				const results = resp.results;
				if( results ) {

				} else {

				}
				
			} else {
				// this.updateLogState( "error", "failed to reach the server" );
			}
		} catch {
			// this.updateLogState( "error", "failed to reach the server" );
			console.log("error");
		}
	}