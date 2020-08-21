import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import PaginationView from "../components/PaginationView";
import AdminNavBar from "../components/AdminNabBar";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { pagination_size } from "../constants";
import { getDecryptedCookieValue, formatDateTime } from "../utils";
import { fetchCitiesAction, fetchOrdersByCityAction } from '../actions/index';

function AdminFilter(props) {
  const [loading, setLoading] = useState(true);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [snackBarType, setSnackBarType] = useState("success");

  const [redirectToAdminHome, setRedirectToAdminHome] = useState(false);

  const [selectedCity, setSelectedCity] = useState(0);

  const [baseAPIEndPoint, setBaseAPIEndPoint] = useState(
    "get-orders-by-city-list/?format=json&city="
  );

  const [paginationVisible, setPaginationVisible] = useState(false);
  const [paginationActivePage, setPaginationActivePage] = useState(0);
  const [paginationAPIEndPoint, setPaginationAPIEndPoint] = useState(
    "get-orders-by-city-list/?format=json&city=0"
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

      try {
        //fetching all cities list from api
        await props.fetchCitiesAction();

        //by default "All" city's orders will be displayed
        const baseAPI_EndPoint = (await baseAPIEndPoint) + (await selectedCity);
        await fetchAndDisplayOrders(baseAPI_EndPoint);
      } catch {
        makeSnackBar("Something went wrong", "error");
      }
      
      await hideLoadingAnimation(); //hiding loading animation
    };

    componentDidMount();
  }, []);

  // to keep trace if any error is coming in fetching cities from api
  useEffect(() => {
    if( props.cities.error === 1 ) {
      makeSnackBar("Something went wrong", "error");
    }
  }, [ props.cities ]);

  // to keep trace if any error is coming in fetching orders of the selected city from api
  useEffect(() => {
    if( props.ordersByCity.error === 1 ) {
      makeSnackBar("Something went wrong", "error");
    }
  }, [ props.ordersByCity ]);
  
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
    //fetching orders of that city from api
    const selected_City = await e.target.value;
    const baseAPI_EndPoint = (await baseAPIEndPoint) + (await selected_City);
    await fetchAndDisplayOrders(baseAPI_EndPoint);

    //updating state for selected city and pagination end-point
    await setSelectedCity(selected_City);
    await setPaginationAPIEndPoint(baseAPI_EndPoint);
  };

  //function to fetch and display order list
  const fetchAndDisplayOrders = async (baseAPI_EndPoint) => {
    await displayLoadingAnimation(); //displaying loading animation

    try {
      await props.fetchOrdersByCityAction(baseAPI_EndPoint);

      await setPaginationActivePage(0);
      await setPaginationVisible(true);
      
    } catch {
      await makeSnackBar("Something went wrong", "error");
    }

    await hideLoadingAnimation(); //hiding loading animation
  };

  //function to handle when any pagination btn is pressed
  const onPaginationBtnClick = async (index) => {
    //loading the selected page content
    let api_end_point = paginationAPIEndPoint;
    if (index > 0) {
      const page = index + 1;
      api_end_point += "&page=" + page;
    }

    await fetchAndDisplayOrders(api_end_point);
    
    //highlighting the selected page btn
    await setPaginationActivePage(index);
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
            {props.cities.data.map((item, idx) => {
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
            props.ordersByCity.data.map((item, idx) => {
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
            total_items={props.ordersByCity.total_items}
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

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    ordersByCity: state.ordersByCity,
  }
}

const mapDispatchToProps = (dispatch) => {
  return  {
    fetchCitiesAction: () => { dispatch(fetchCitiesAction()) },
    fetchOrdersByCityAction: ( baseAPI_EndPoint ) => { dispatch(fetchOrdersByCityAction( baseAPI_EndPoint )) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( AdminFilter );
