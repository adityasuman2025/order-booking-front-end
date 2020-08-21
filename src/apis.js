import axios from "axios";

import { api_url_address } from "./constants";

//function to fetch products according to pagination
export const fetchProducts = async (api_endpoint) => {
  //sending rqst to api
  try {
    const request_address = api_url_address + api_endpoint;
    const response = await axios.get(request_address);

    //getting resp from sent rqst
    if (response) {
      const resp = await response.data;

      const results = resp.results;
      if (results) {
        return resp;
      }
    }
  } catch {
    // makeSnackBar( "something went wrong", "error" );
  }

  return null;
};

//function to check if a user exist with a phone number
export const checkUserExistsWithGivenPhoneNumber = async (phone_no) => {
  //sending rqst to api
  try {
    const api_endpoint =
      "check-user-with-phone-no-exists/?phone_no=" + phone_no;
    const request_address = api_url_address + api_endpoint;
    const response = await axios.get(request_address);

    //getting resp from sent rqst
    if (response) {
      const resp = await response.data;

      const error = resp.error;
      if (error === 0) {
        return 1; //user exists with that phone no
      } else if (error === 1) {
        return 0; //user does not exists
      }
    }
  } catch {
    // makeSnackBar( "something went wrong", "error" );
  }

  return null;
};

//function to create a user
export const createUser = async (first_name, last_name, phone) => {
  //sending rqst to api
  try {
    const request_address = api_url_address + "users/";
    const response = await axios.post(request_address, {
      first_name: first_name,
      last_name: last_name,
      phone: phone,
    });

    //getting resp from sent rqst
    if (response) {
      const resp = await response.data;

      const error = resp.error;
      if (error === 0) {
        return 1;
      }
    }
  } catch {
    // makeSnackBar( "something went wrong", "error" );
  }

  return null;
};

//function to fetch all cities
export const fetchCities = async () => {
  //sending rqst to api
  try {
    const request_address = api_url_address + "cities/";
    const response = await axios.get(request_address);

    //getting resp from sent rqst
    if (response) {
      const resp = await response.data;

      return resp;
    }
  } catch {
    // makeSnackBar( "something went wrong", "error" );
  }

  return null;
};

//function to book an order of the user
export const BookUserOrder = async (user_phone_no, product_id, city_id) => {
  //sending rqst to api
  try {
    const request_address = api_url_address + "orders/";
    const response = await axios.post(request_address, {
      user: user_phone_no,
      product: product_id,
      city: city_id,
    });

    //getting resp from sent rqst
    if (response) {
      const resp = await response.data;

      const error = resp.error;
      if (error === 0) {
        return 1;
      }
    }
  } catch {
    // makeSnackBar( "something went wrong", "error" );
  }

  return null;
};

//function to verify phone no is admin or not
export const verifyAdmin = async (phone_no) => {
  //sending rqst to api
  try {
    const request_address =
      api_url_address + "verify-admin/?phone_no=" + phone_no;
    const response = await axios.get(request_address);

    //getting resp from sent rqst
    if (response) {
      const resp = await response.data;

      const error = resp.error;
      if (error === 0) {
        return resp.resp;
      }
    }
  } catch {
    // makeSnackBar( "something went wrong", "error" );
  }

  return null;
};

//function to fetch today's top bottom cities
export const fetchTodaysTopBottomCities = async () => {
  //sending rqst to api
  try {
    const request_address = api_url_address + "get-orders-of-cities-for-today";
    const response = await axios.get(request_address);

    //getting resp from sent rqst
    if (response) {
      const resp = await response.data;

      const error = resp.error;
      if (error === 0) {
        return resp.resp;
      }
    }
  } catch {
    // makeSnackBar( "something went wrong", "error" );
  }

  return null;
};

//function to fetch weekly top bottom cities
export const fetchWeeklyTopBottomCities = async () => {
  //sending rqst to api
  try {
    const request_address = api_url_address + "get-orders-of-cities-for-week/";
    const response = await axios.get(request_address);

    //getting resp from sent rqst
    if (response) {
      const resp = await response.data;

      const error = resp.error;
      if (error === 0) {
        return resp.resp;
      }
    }
  } catch {
    // makeSnackBar( "something went wrong", "error" );
  }

  return null;
};

//function to fetch orders by city according to pagination
export const fetchOrdersByCity = async (api_endpoint) => {
  //sending rqst to api
  try {
    const request_address = api_url_address + api_endpoint;
    const response = await axios.get(request_address);

    //getting resp from sent rqst
    if (response) {
      const resp = await response.data;

      return resp;
    }
  } catch {
    // makeSnackBar( "something went wrong", "error" );
  }

  return null;
};

//function to create a product
export const createProduct = async (name, description, price) => {
  //sending rqst to api
  try {
    const request_address = api_url_address + "products/";
    const response = await axios.post(request_address, {
      name: name,
      description: description,
      price: price,
    });

    //getting resp from sent rqst
    if (response) {
      const resp = await response.data;

      const error = resp.error;
      if (error === 0) {
        return 1;
      }
    }
  } catch {
    // makeSnackBar( "something went wrong", "error" );
  }

  return null;
};
