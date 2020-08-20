import axios from 'axios';

import { fetchProducts, fetchCities } from "../apis";

export const fetchProductsAction = ( baseAPI_EndPoint ) => async (dispatch) => {
    let toSend = {};
    toSend["error"] = 1;
    toSend["data"] = [];
    try {
        const response = await fetchProducts(baseAPI_EndPoint);
        if( response ) {
            const total_items = response.count;
            toSend["error"]         = 0;
            toSend["data"]          = response.results;
            toSend["total_items"]   = total_items;

            dispatch({ type: 'GET_PRODUCTS', payload: toSend });
        } else {
            dispatch({ type: 'GET_PRODUCTS', payload: toSend });
        }
    } catch {
        dispatch({ type: 'GET_PRODUCTS', payload: toSend });
    }
}

export const fetchCitiesAction = ( baseAPI_EndPoint ) => async (dispatch) => {
    let toSend = {};
    toSend["error"] = 1;
    toSend["data"] = [];
    try {
        const response = await fetchCities(baseAPI_EndPoint);
        if( response ) {
            toSend["error"]         = response.error;
            toSend["data"]          = response.resp;

            dispatch({ type: 'GET_CITIES', payload: toSend });
        } else {
            dispatch({ type: 'GET_CITIES', payload: toSend });
        }
    } catch {
        dispatch({ type: 'GET_CITIES', payload: toSend });
    }
}