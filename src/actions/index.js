import axios from "axios";

import { api_url_address } from "../constants";

export const fetchProductsAction = ( baseAPI_EndPoint ) => async (dispatch) => {
    let toSend = {};
    toSend["error"] = 1;
    toSend["data"] = [];

    //sending rqst to api
    try {
        const request_address = api_url_address + baseAPI_EndPoint;
        const response = await axios.get(request_address);

        //getting resp from sent rqst
        if (response) {
            const resp = await response.data;

            const results = resp.results;
            if (results) {
                const total_items       = resp.count;

                toSend["error"]         = 0;
                toSend["data"]          = resp.results;
                toSend["total_items"]   = total_items;

                dispatch({ type: 'GET_PRODUCTS', payload: toSend });
            } else {
                dispatch({ type: 'GET_PRODUCTS', payload: toSend });
            }
        } else {
            dispatch({ type: 'GET_PRODUCTS', payload: toSend });
        }
    } catch {
        dispatch({ type: 'GET_PRODUCTS', payload: toSend });
    }
}

export const fetchCitiesAction = () => async (dispatch) => {
    let toSend = {};
    toSend["error"] = 1;
    toSend["data"] = [];
   
    //sending rqst to api
    try {
        const request_address = api_url_address + "cities/";
        const response = await axios.get(request_address);

        //getting resp from sent rqst
        if (response) {
            const resp              = await response.data;

            toSend["error"]         = resp.error;
            toSend["data"]          = resp.resp;

            dispatch({ type: 'GET_CITIES', payload: toSend });
        } else {
            dispatch({ type: 'GET_CITIES', payload: toSend });
        }
    } catch {
        dispatch({ type: 'GET_CITIES', payload: toSend });
    }
}

export const fetchOrdersByCityAction = ( api_endpoint ) => async (dispatch) => {
    let toSend = {};
    toSend["error"] = 1;
    toSend["data"] = [];

    //sending rqst to api
    try {
        const request_address = api_url_address + api_endpoint;
        const response = await axios.get(request_address);

        //getting resp from sent rqst
        if (response) {
            const resp = await response.data;

            const results = resp.results;
            if (results) {
                const total_items       = resp.count;

                toSend["error"]         = 0;
                toSend["data"]          = resp.results;
                toSend["total_items"]   = total_items;

                dispatch({ type: 'GET_ORDERS_BY_CITY', payload: toSend });
            } else {
                dispatch({ type: 'GET_ORDERS_BY_CITY', payload: toSend });
            }
        } else {
            dispatch({ type: 'GET_ORDERS_BY_CITY', payload: toSend });
        }
    } catch {
        dispatch({ type: 'GET_ORDERS_BY_CITY', payload: toSend });
    }
}

export const fetchOrdersByCityListAction = ( city_id ) => async (dispatch) => {
    let toSend = {};
    toSend["error"] = 1;
    toSend["data"] = [];

    //sending rqst to api
    try {
        const api_endpoint = "get-orders-by-city/?city=" + city_id;
        const request_address = api_url_address + api_endpoint;
        const response = await axios.get(request_address);

        //getting resp from sent rqst
        if (response) {
            const resp              = await response.data;

            toSend["error"]         = resp.error;
            toSend["data"]          = resp.resp;

            dispatch({ type: 'GET_ORDERS_BY_CITY_lIST', payload: toSend });
        } else {
            dispatch({ type: 'GET_ORDERS_BY_CITY_lIST', payload: toSend });
        }
    } catch {
        dispatch({ type: 'GET_ORDERS_BY_CITY_lIST', payload: toSend });
    }
}

export const fetchTodaysTopBottomCitiesAction = () => async (dispatch) => {
    let toSend = {};
    toSend["error"] = 1;
    toSend["data"] = [];

    //sending rqst to api
    try {
        const request_address = api_url_address + "get-orders-of-cities-for-today";
        const response = await axios.get(request_address);

        //getting resp from sent rqst
        if (response) {
            const resp              = await response.data;

            toSend["error"]         = resp.error;
            toSend["data"]          = resp.resp;

            dispatch({ type: 'GET_TODAYS_CITIES_ORDERS', payload: toSend });
        } else {
            dispatch({ type: 'GET_TODAYS_CITIES_ORDERS', payload: toSend });
        }
    } catch {
        dispatch({ type: 'GET_TODAYS_CITIES_ORDERS', payload: toSend });
    }
}

export const fetchWeeklyTopBottomCitiesAction = () => async (dispatch) => {
    let toSend = {};
    toSend["error"] = 1;
    toSend["data"] = [];

    //sending rqst to api
    try {
        const request_address = api_url_address + "get-orders-of-cities-for-week/";
        const response = await axios.get(request_address);

        //getting resp from sent rqst
        if( response ) {
            const resp              = await response.data;

            toSend["error"]         = resp.error;
            toSend["data"]          = resp.resp;

            dispatch({ type: 'GET_WEEKLY_CITIES_ORDERS', payload: toSend });
        } else {
            dispatch({ type: 'GET_WEEKLY_CITIES_ORDERS', payload: toSend });
        }
    } catch {
        dispatch({ type: 'GET_WEEKLY_CITIES_ORDERS', payload: toSend });
    }
}