// variables for setting cookie expiratiom tym
    export const cookie_expiration_mins = 1 * 24 * 60; // 1 days

    let cookie_expiration_tym = new Date();
    cookie_expiration_tym.setTime( cookie_expiration_tym.getTime() + ( cookie_expiration_mins*60*1000 ));
    export const cookie_expiration_time = cookie_expiration_tym;

//general variables
    export const api_url_address = "http://127.0.0.1:8000/";
    
    export const pagination_size = 10;

    export const project_name = "Order Booking Flow";
    export const encryption_key = "topprs_order_booking_project";

    export const admin_username = "toppr";
    export const admin_password = "Toppr@123";

    export const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];