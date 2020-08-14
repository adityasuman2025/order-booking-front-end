// variables for setting cookie expiratiom tym
    export const cookie_expiration_mins = 15 * 24 * 60; // 15 days

    let cookie_expiration_tym = new Date();
    cookie_expiration_tym.setTime( cookie_expiration_tym.getTime() + ( cookie_expiration_mins*60*1000 ));
    export const cookie_expiration_time = cookie_expiration_tym;

//for getting api url address and certificate share url address
    let api_url_address_temp = "http://127.0.0.1:8000/";

//general variables
    export const project_name = "Order Booking Flow";
    export const encryption_key = "topprs_order_booking_project";