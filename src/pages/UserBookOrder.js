import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import CircularButton from "../components/CircularButton";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";
import SuccesMsg from "../components/SuccesMsg";

import { BookUserOrder } from "../apis";
import { getDecryptedCookieValue } from "../utils";
import { fetchCitiesAction } from '../actions/index';

function UserOrder(props) {
  const [loading, setLoading] = useState(true);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [snackBarType, setSnackBarType] = useState("success");

  const [productID, setProductID] = useState(0);

  const [formVisible, setFormVisible] = useState(true);

  const [enteredProductName, setEnteredProductName] = useState("");
  const [enteredPhoneNo, setEnteredPhoneNo] = useState("");
  const [selectedCity, setSelectedCity] = useState(0);

  //componentDidMount
  useEffect(() => {
    const componentDidMount = async () => {
      //getting product name and phone number from cookie
      const product_id = props.match.params.product_id;

      setProductID(product_id);
      setEnteredProductName(
        (await getDecryptedCookieValue(
          "order_booking_selected_product_name"
        )) || ""
      );
      setEnteredPhoneNo(
        (await getDecryptedCookieValue("order_booking_user_phone_no")) || ""
      );

      //fetching all cities list from api
      try {
        props.fetchCitiesAction();
      } catch {
        makeSnackBar("Something went wrong", "error");
      }

      hideLoadingAnimation(); //hiding loading animation
    };

    componentDidMount();
  }, []);

  // to keep trace if any error is coming in fetching cities from api
  useEffect(() => {
    if( props.cities.error === 1 ) {
      makeSnackBar("Something went wrong", "error");
    }
  }, [ props.cities ]);

  //function to make a snack-bar
  const makeSnackBar = (msg, type) => {
    setSnackBarMsg(msg);
    setSnackBarType(type);

    setSnackBarVisible(true);
  };

  //function to close snack-bar
  const handleSnackBarClose = () => {
    setSnackBarVisible(false);
  };

  //function to toogle loadiing animation
  const displayLoadingAnimation = () => {
    setLoading(true);
  };

  const hideLoadingAnimation = () => {
    setLoading(false);
  };

  //function to hanlde when book btn is pressed
  const onBookPressed = async (e) => {
    e.preventDefault();

    displayLoadingAnimation(); //displaying loading animation

    //verifying if all input data is correct
    const user_phone_no = enteredPhoneNo.trim();
    const product_id = productID;
    const city_id = selectedCity;

    if (city_id === 0) {
      makeSnackBar("Please select a city", "error");
      hideLoadingAnimation(); //hiding loading animation
      return;
    }

    if (product_id === 0) {
      makeSnackBar("Invalid product", "error");
      hideLoadingAnimation(); //hiding loading animation
      return;
    }

    if (user_phone_no === "") {
      makeSnackBar("Invalid Phone Number", "error");
      hideLoadingAnimation(); //hiding loading animation
      return;
    }

    //all good //sending rqst to api to book an order of the user
    try {
      const response = await BookUserOrder(user_phone_no, product_id, city_id);
      if (response) {
        //hiding form and displaying success msg
        setFormVisible(false);
        makeSnackBar("Your order successfully booked", "success");
      } else {
        makeSnackBar("Something went wrong", "error");
      }
    } catch {
      makeSnackBar("Something went wrong", "error");
    }

    hideLoadingAnimation(); //hiding loading animation
  };

  //rendering
  return (
    <div>
      <div className="pageContent center">
        <br />
        <br />
        <br />
        <br />
        <h2>Book Your Order</h2>
        <br />

        {formVisible ? (
          <form onSubmit={onBookPressed}>
            <label className="labelBox">
              Product
              <br />
              <div className="inputBox inputBox2">{enteredProductName}</div>
            </label>
            <br />
            <br />

            <label className="labelBox">
              Phone Number
              <br />
              <div className="inputBox inputBox2">{enteredPhoneNo}</div>
            </label>
            <br />
            <br />

            <label className="labelBox">
              City
              <br />
              <select
                type="number"
                className="inputBox inputBox2"
                name="selectedCity"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="0">Select City</option>
                {props.cities.data.map((item, idx) => {
                  return (
                    <option key={idx} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <br />
            <br />

            <CircularButton text="Book" onClick={onBookPressed} />
          </form>
        ) : (
          <SuccesMsg
            successMsg="Thank you for booking your order with us!"
            redirectToName="HOME"
            redirectToUrl="/user"
          />
        )}

        <br />
        <LoadingAnimation loading={loading} />
      </div>

      <SnackBar
        open={snackBarVisible}
        msg={snackBarMsg}
        type={snackBarType}
        handleClose={handleSnackBarClose}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
  }
}

const mapDispatchToProps = (dispatch) => {
  return  {
    fetchCitiesAction: () => { dispatch(fetchCitiesAction()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( UserOrder );
