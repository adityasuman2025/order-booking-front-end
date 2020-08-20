import axios from 'axios';

import { fetchProducts } from "../apis";

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

export const updateCachedPosts = () => async (dispatch) => {
    // let posts = await db.posts.toArray()
    dispatch({ type: 'UPDATE_POSTS', payload: []})
}