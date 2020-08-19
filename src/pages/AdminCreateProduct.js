import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import AdminNavBar from "../components/AdminNabBar";
import CircularButton from "../components/CircularButton";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";
import SuccesMsg from "../components/SuccesMsg";

import { getDecryptedCookieValue } from "../utils";
import { createProduct } from "../apis";

function AdminCreateProduct(props) {
  const [loading, setLoading] = useState(true);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [snackBarType, setSnackBarType] = useState("success");

  const [redirectToAdminHome, setRedirectToAdminHome] = useState(false);

  const [formVisible, setFormVisible] = useState(true);

  const [enteredProductName, setEnteredProductName] = useState("");
  const [enteredProductDesc, setEnteredProductDesc] = useState("");
  const [enteredProductPrice, setEnteredProductPrice] = useState("");

  //componentDidMount
  useEffect(() => {
    const componentDidMount = async () => {
      //checking if admin is logged or not
      const isAdminLogged = await getDecryptedCookieValue(
        "order_booking_admin_logged"
      );
      if (isAdminLogged !== "1") {
        //if admin is not logged then redirecting to admin home page
        setRedirectToAdminHome(true);
        return;
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

  //function to hanlde when create btn is clicked
  const onCreatePressed = async (e) => {
    e.preventDefault();
    await displayLoadingAnimation(); //showing loading animation

    //verifying if entered data
    const enteredProduct_Name = enteredProductName.trim();
    const enteredProduct_Desc = enteredProductDesc.trim();
    const enteredProduct_Price = enteredProductPrice.trim();

    if (
      enteredProduct_Name !== "" &&
      enteredProduct_Desc !== "" &&
      enteredProduct_Price !== ""
    ) {
      //if everything is fine
      const response = await createProduct(
        enteredProduct_Name,
        enteredProduct_Desc,
        enteredProduct_Price
      );
      if (response === 1) {
        //hiding form and displaying success msg
        setFormVisible(false);
        await makeSnackBar("Product successfully created.", "success");
      } else {
        await makeSnackBar("Something went wrong", "error");
      }
    } else {
      await makeSnackBar("Please fill all details", "error");
    }

    await hideLoadingAnimation(); //hiding loading animation
  };

  //rendering
  return (
    <div>
      {
        //redirecting to admin home page
        redirectToAdminHome ? <Redirect to={"/admin"} /> : null
      }

      <AdminNavBar active="create_product" />
      <br />
      <br />
      <br />

      <div className="pageContent center">
        <br />
        <br />
        <h2>Create Product</h2>
        <br />

        {formVisible ? (
          <form onSubmit={onCreatePressed}>
            <label className="labelBox">
              Name
              <br />
              <input
                type="text"
                required
                className="inputBox inputBox2"
                // placeholder="first name"
                name="enteredProductName"
                value={enteredProductName}
                onChange={(e) => setEnteredProductName(e.target.value)}
              />
            </label>
            <br />
            <br />

            <label className="labelBox">
              Description
              <br />
              <textarea
                required
                className="inputBox inputBox2"
                // placeholder="second name"
                name="enteredProductDesc"
                value={enteredProductDesc}
                onChange={(e) => setEnteredProductDesc(e.target.value)}
              />
            </label>
            <br />
            <br />

            <label className="labelBox">
              Price (in Rupees)
              <br />
              <input
                type="number"
                required
                className="inputBox inputBox2"
                // placeholder="phone nuber"
                name="enteredProductPrice"
                value={enteredProductPrice}
                onChange={(e) => setEnteredProductPrice(e.target.value)}
              />
            </label>
            <br />
            <br />

            <CircularButton text="Create" onClick={onCreatePressed} />
          </form>
        ) : (
          <SuccesMsg
            successMsg="Product successfully created"
            redirectToName="Create Another"
            redirectToUrl="reload"
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

export default AdminCreateProduct;
