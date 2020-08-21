import React, { useState, useEffect } from "react";

import CircularButton from "../components/CircularButton";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { checkUserExistsWithGivenPhoneNumber } from "../apis";
import { getDecryptedCookieValue, makeEncryptedCookie } from "../utils";

function UserOrder(props) {
  const [loading, setLoading] = useState(true);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [snackBarType, setSnackBarType] = useState("success");

  const [productID, setProductID] = useState(0);

  const [enteredPhoneNo, setEnteredPhoneNo] = useState("");

  //componentDidMount
  useEffect(() => {
    const componentDidMount = async () => {
      //by default first page of products will be listed
      const product_id = props.match.params.product_id;
      const entered_PhoneNo =
        (await getDecryptedCookieValue("order_booking_user_phone_no")) || "";

      setProductID(product_id);
      setEnteredPhoneNo(entered_PhoneNo);

      hideLoadingAnimation(); //hiding loading animation
    };

    componentDidMount();
  }, []);

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

  //when proceed btn is pressed
  const onProceedPress = async (e) => {
    e.preventDefault();

    displayLoadingAnimation(); //showing loading animation

    //checking if some phone no is entered
    const entered_PhoneNo = await enteredPhoneNo.trim();
    if (entered_PhoneNo === "") {
      makeSnackBar("Please enter a phone number", "error");
    } else {
      try {
        const response = await checkUserExistsWithGivenPhoneNumber(
          entered_PhoneNo
        );
        if (response === 1) {
          //making of the phone no entered by user and redirecting to book-order page
          const enteredPhoneNo_cookie = await makeEncryptedCookie(
            "order_booking_user_phone_no",
            entered_PhoneNo
          );
          if (enteredPhoneNo_cookie) {
            const product_id = await productID;
            props.history.push("/user/book-order/" + product_id);

            return;
          } else {
            makeSnackBar("Something went wrong", "error");
          }
        } else if (response === 0) {
          makeSnackBar(
            "This phone number is not registered. Please Create a User to continue",
            "error"
          );
        } else {
          makeSnackBar("Something went wrong", "error");
        }
      } catch {
        makeSnackBar("Something went wrong", "error");
      }
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

        <form onSubmit={onProceedPress}>
          <label>
            Enter your phone number
            <br />
            <input
              type="number"
              className="inputBox"
              placeholder="Phone Number"
              name="enteredPhoneNo"
              value={enteredPhoneNo}
              onChange={(e) => setEnteredPhoneNo(e.target.value)}
            />
          </label>
          <br />
          <br />

          <CircularButton text="Proceed" onClick={onProceedPress} />
        </form>
        <br />
        <button
          className="btn coloredTextBtn"
          onClick={() => {
            props.history.push("/user/create-user");
          }}
        >
          CREATE USER
        </button>

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
