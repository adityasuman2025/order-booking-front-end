import React, { useState, useEffect } from "react";

import CircularButton from "../components/CircularButton";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";
import SuccesMsg from "../components/SuccesMsg";

import { createUser } from "../apis";
import { validateUsername, validateContactNo } from "../utils";

function UserCreateUser(props) {
  const [loading, setLoading] = useState(true);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [snackBarType, setSnackBarType] = useState("success");

  const [formVisible, setFormVisible] = useState(true);

  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredSecondName, setEnteredSecondName] = useState("");
  const [enteredPhoneNo, setEnteredPhoneNo] = useState("");

  //componentDidMount
  useEffect(() => {
    const componentDidMount = async () => {
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

  //function to hanlde when create btn is clicked
  const onCreatePressed = async (e) => {
    e.preventDefault();

    displayLoadingAnimation(); //showing loading animation

    //verifying if entered data
    const entered_FirstName = enteredFirstName.trim();
    const entered_SecondName = enteredSecondName.trim();
    const entered_PhoneNo = enteredPhoneNo.trim();

    if (
      entered_FirstName !== "" &&
      entered_SecondName !== "" &&
      entered_PhoneNo !== ""
    ) {
      if (!validateUsername(entered_FirstName)) {
        makeSnackBar(
          "First Name cannot contain numbers, symbols and spaces",
          "error"
        );
        hideLoadingAnimation(); //hiding loading animation
        return;
      }

      if (!validateUsername(entered_SecondName)) {
        makeSnackBar(
          "Second Name cannot contain numbers, symbols and spaces",
          "error"
        );
        hideLoadingAnimation(); //hiding loading animation
        return;
      }

      if (!validateContactNo(entered_PhoneNo)) {
        makeSnackBar(
          "Contact number can only contain integer",
          "error"
        );
        hideLoadingAnimation(); //hiding loading animation
        return;
      }

      if (entered_PhoneNo.length !== 10) {
        makeSnackBar("Phone number must be 10 digits long", "error");
        hideLoadingAnimation(); //hiding loading animation
        return;
      }

      //if everything is fine
      try {
        const response = await createUser(
          entered_FirstName,
          entered_SecondName,
          entered_PhoneNo
        );
        if (response === 1) {
          //hiding form and displaying success msg
          setFormVisible(false);
  
          makeSnackBar(
            "User created. You can book orders with your phone number now",
            "success"
          );
          // this.props.history.goBack();
        } else {
          makeSnackBar("This phone number is already taken", "error");
        }
      } catch {
        makeSnackBar("Something went wrong", "error");
      }
    } else {
      makeSnackBar("Please fill all details", "error");
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
        <h2>Create User</h2>
        <br />

        {formVisible ? (
          <form onSubmit={onCreatePressed}>
            <label className="labelBox">
              First Name
              <br />
              <input
                type="text"
                required
                className="inputBox inputBox2"
                // placeholder="first name"
                name="enteredFirstName"
                value={enteredFirstName}
                onChange={(e) => setEnteredFirstName(e.target.value)}
              />
            </label>
            <br />
            <br />

            <label className="labelBox">
              Last Name
              <br />
              <input
                type="text"
                required
                className="inputBox inputBox2"
                // placeholder="second name"
                name="enteredSecondName"
                value={enteredSecondName}
                onChange={(e) => setEnteredSecondName(e.target.value)}
              />
            </label>
            <br />
            <br />

            <label className="labelBox">
              Phone Number
              <br />
              <input
                // type="number"
                type="tel"
                required
                className="inputBox inputBox2"
                // placeholder="phone nuber"
                name="enteredPhoneNo"
                value={enteredPhoneNo}
                onChange={(e) => setEnteredPhoneNo(e.target.value)}
              />
            </label>
            <br />
            <br />

            <CircularButton text="Create" onClick={onCreatePressed} />
          </form>
        ) : (
          <SuccesMsg
            successMsg="User successfully created"
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

export default UserCreateUser;
