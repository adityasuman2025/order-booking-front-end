import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import PaginationView from "../components/PaginationView";
import AdminNavBar from "../components/AdminNabBar";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { pagination_size } from "../constants";
import { fetchCities, fetchOrdersByCity } from "../apis";
import { getDecryptedCookieValue, formatDateTime } from "../utils";

function AdminFilter(props) {
  const [loading, setLoading] = useState(true);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [snackBarType, setSnackBarType] = useState("success");

  const [redirectToAdminHome, setRedirectToAdminHome] = useState(false);

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(0);

  const [orders, setOrders] = useState([]);

  const [baseAPIEndPoint, setBaseAPIEndPoint] = useState(
    "get-orders-by-city-list/?format=json&city="
  );

  const [paginationVisible, setPaginationVisible] = useState(false);
  const [paginationTotalItems, setPaginationTotalItems] = useState(0);
  const [paginationActivePage, setPaginationActivePage] = useState(0);
  const [paginationAPIEndPoint, setPaginationAPIEndPoint] = useState(
    "get-orders-by-city-list/?format=json&city="
  );

  //componentDidMount
  useEffect(() => {
    const componentDidMount = async () => {
      //checking if admin is already logged or not
      const isAdminLogged = await getDecryptedCookieValue(
        "order_booking_admin_logged"
      );
      if (isAdminLogged !== "1") {
        //if admin is not logged then redirecting to admin home page
        setRedirectToAdminHome(true);
        return;
      }

      //fetching all cities list from api
      const response = await fetchCities();
      if (response) {
        setCities(response);
      } else {
        await makeSnackBar("Something went wrong", "error");
      }

      //by default "All" cities orders will be displayed
      await fetchAndDisplayOrders(selectedCity);

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

  // when a city is selected from drop down menu
  const onSelectACity = async (e) => {
    const selected_City = await e.target.value;

    await displayLoadingAnimation(); //displaying loading animation
    await setSelectedCity(selected_City);

    //fetching orders of that city from api
    await fetchAndDisplayOrders(selected_City);

    await hideLoadingAnimation(); //hiding loading animation
  };

  //function to fetch and display order list
  const fetchAndDisplayOrders = async (city_id) => {
    const baseAPI_Endpoint = (await baseAPIEndPoint) + city_id;
    const response = await fetchOrdersByCity(baseAPI_Endpoint);
    if (response) {
      const total_items = response.count;
      const results = response.results;

      await setOrders(results);

      await setPaginationAPIEndPoint(baseAPI_Endpoint);
      await setPaginationTotalItems(total_items);
      await setPaginationActivePage(0);
      await setPaginationVisible(true);
    } else {
      await makeSnackBar("Something went wrong", "error");
    }
  };

  //function to handle when any pagination btn is pressed
  const onPaginationBtnClick = async (index) => {
    await displayLoadingAnimation(); //displaying loading animation

    //highlighting the selected page btn
    await setPaginationActivePage(index);

    //loading the selected page content
    let api_end_point = paginationAPIEndPoint;
    if (index > 0) {
      const page = index + 1;
      api_end_point += "&page=" + page;
    }
    const response = await fetchOrdersByCity(api_end_point);
    if (response) {
      const results = response.results;
      await setOrders(results);
    } else {
      makeSnackBar("Something went wrong", "error");
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

      <AdminNavBar active="filter" />
      <br />
      <br />

      <div className="pageContent">
        <center>
          <select
            className="inputBox inputBox2"
            name="selectedCity"
            value={selectedCity}
            onChange={onSelectACity}
          >
            <option value="0">All</option>
            {cities.map((item, idx) => {
              return (
                <option key={idx} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </center>
        <br />

        <div className="container">
          {
            //listing orders of the selected city
            orders.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="row productList"
                  style={{ cursor: "default" }}
                >
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 productText">
                    {item.product.name}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 orderUserName">
                    {"Rs. " + item.product.price}
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productDateTimeText">
                    {formatDateTime(item.added_on)}
                  </div>
                </div>
              );
            })
          }
        </div>

        <LoadingAnimation loading={loading} />
      </div>

      {
        //pagination area
        paginationVisible ? (
          <PaginationView
            total_items={paginationTotalItems}
            pagination_size={pagination_size}
            active_page_no={paginationActivePage}
            onPaginationBtnClick={onPaginationBtnClick}
          />
        ) : null
      }

      <SnackBar
        open={snackBarVisible}
        msg={snackBarMsg}
        type={snackBarType}
        handleClose={handleSnackBarClose}
      />
    </div>
  );
}

export default AdminFilter;
