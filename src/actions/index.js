import { fetchProducts, fetchCities, fetchOrdersByCity, fetchTodaysTopBottomCities, fetchWeeklyTopBottomCities } from "../apis";

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

export const fetchCitiesAction = () => async (dispatch) => {
    let toSend = {};
    toSend["error"] = 1;
    toSend["data"] = [];
    try {
        const response = await fetchCities();
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

export const fetchOrdersByCityAction = ( api_endpoint ) => async (dispatch) => {
    let toSend = {};
    toSend["error"] = 1;
    toSend["data"] = [];
    try {
        const response = await fetchOrdersByCity( api_endpoint );
        if( response ) {
            const total_items = response.count;
            toSend["error"]         = 0;
            toSend["data"]          = response.results;
            toSend["total_items"]   = total_items;

            dispatch({ type: 'GET_ORDERS_BY_CITY', payload: toSend });
        } else {
            dispatch({ type: 'GET_ORDERS_BY_CITY', payload: toSend });
        }
    } catch {
        dispatch({ type: 'GET_ORDERS_BY_CITY', payload: toSend });
    }
}

export const fetchTodaysTopBottomCitiesAction = () => async (dispatch) => {
    let toSend = {};
    toSend["error"] = 1;
    toSend["data"] = [];
    try {
        const response = await fetchTodaysTopBottomCities();
        if( response ) {
            toSend["error"]         = response.error;
            toSend["data"]          = response.resp;

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
    try {
        const response = await fetchWeeklyTopBottomCities();
        if( response ) {
            toSend["error"]         = response.error;
            toSend["data"]          = response.resp;

            dispatch({ type: 'GET_WEEKLY_CITIES_ORDERS', payload: toSend });
        } else {
            dispatch({ type: 'GET_WEEKLY_CITIES_ORDERS', payload: toSend });
        }
    } catch {
        dispatch({ type: ' GET_WEEKLY_CITIES_ORDERS', payload: toSend });
    }
}