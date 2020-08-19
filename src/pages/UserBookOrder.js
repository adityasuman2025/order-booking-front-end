import React, { useState, useEffect } from "react";

import CircularButton from "../components/CircularButton";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";
import SuccesMsg from "../components/SuccesMsg";

import { fetchCities, BookUserOrder } from "../apis";
import { getDecryptedCookieValue } from "../utils";

function UserOrder(props) {
  const [loading, setLoading] = useState(true);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [snackBarType, setSnackBarType] = useState("success");

  const [productID, setProductID] = useState(0);

  const [cities, setCities] = useState([]);

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
        (await getDecryptedCookieValue("order_booking_user_phone_no")) || 0
      );

      //fetching all cities list from api
      const response = await fetchCities();
      if (response) {
        setCities(response);
      } else {
        await makeSnackBar("Something went wrong", "error");
      }

      await hideLoadingAnimation(); //hiding loading animation
    };

    componentDidMount();
  }, []);

  //function to make a snack-bar
  const makeSnackBar = async (msg, type) => {
    await setSnackBarMsg(msg);
    await setSnackBarType(type);

    await setSnackBarVisible(true);
  };

  //function to close snack-bar
  const handleSnackBarClose = () => {
    setSnackBarVisible(false);
  };

  //function to toogle loadiing animation
  const displayLoadingAnimation = async () => {
    await setLoading(true);
  };

  const hideLoadingAnimation = async () => {
    await setLoading(false);
  };

  //function to hanlde when book btn is pressed
  const onBookPressed = async (e) => {
    e.preventDefault();

    await displayLoadingAnimation(); //displaying loading animation

    //verifying if all input data is correct
    const user_phone_no = enteredPhoneNo.trim();
    const product_id = productID;
    const city_id = selectedCity;

    if (city_id == 0) {
      await makeSnackBar("Please select a city", "error");
      await hideLoadingAnimation(); //hiding loading animation
      return;
    }

    if (product_id == 0) {
      await makeSnackBar("Invalid product", "error");
      await hideLoadingAnimation(); //hiding loading animation
      return;
    }

    if (user_phone_no == "") {
      await makeSnackBar("Invalid Phone Number", "error");
      await hideLoadingAnimation(); //hiding loading animation
      return;
    }

    //all good //sending rqst to api to book an order of the user
    const response = await BookUserOrder(user_phone_no, product_id, city_id);
    if (response) {
      //hiding form and displaying success msg
      setFormVisible(false);
      await makeSnackBar("Your order successfully booked", "success");
    } else {
      await makeSnackBar("Something went wrong", "error");
    }

    await hideLoadingAnimation(); //hiding loading animation
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
                <option value="0">select city</option>
                {cities.map((item, idx) => {
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
            successMsg="Your order successfully booked"
            redirectToName="Home"
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

export default UserOrder;
