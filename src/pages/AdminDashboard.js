import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import AdminNavBar from "../components/AdminNabBar";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { getDecryptedCookieValue } from "../utils";
import { fetchTodaysTopBottomCitiesAction, fetchWeeklyTopBottomCitiesAction } from '../actions/index';

function AdminDashboard(props) {
  const [loading, setLoading] = useState(true);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [snackBarType, setSnackBarType] = useState("success");

  const [redirectToAdminHome, setRedirectToAdminHome] = useState(false);

  const [graphBoxHeight, setGraphBoxHeight] = useState(230);

  const [todaysTop3, setTodaysTop3] = useState([]);
  const [todaysBottom3, setTodaysBottom3] = useState([]);
  const [weeklyTop3, setWeeklyTop3] = useState([]);
  const [weeklyBottom3, setWeeklyBottom3] = useState([]);

  const [todaysTopMaxOrderCount, setTodaysTopMaxOrderCount] = useState(1);
  const [todaysBottomMaxOrderCount, setTodaysBottomMaxOrderCount] = useState(1);
  const [weeklyTopMaxOrderCount, setWeeklyTopMaxOrderCount] = useState(1);
  const [weeklyBottomMaxOrderCount, setWeeklyBottomMaxOrderCount] = useState(1);

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

      try {
        props.fetchTodaysTopBottomCitiesAction();
        props.fetchWeeklyTopBottomCitiesAction();
      } catch {
        makeSnackBar("Something went wrong", "error");
      }

      hideLoadingAnimation(); //hiding loading animation
    };

    componentDidMount();
  }, []);

  //to keep trace if any error is coming in fetching today's cities orders from api
  useEffect(() => {
   if ( props.todaysCitiesOrders.error === 0 ) {
      //getting todays top/bottom cities
      try {
        const todays = props.todaysCitiesOrders.data;

        let todaysTop3 = [...todays]; //copying todays array to todaysTop3 array
        todaysTop3 = todaysTop3.reverse();
        todaysTop3 = todaysTop3.slice(0, 3);

        let todaysTopMaxOrderCount = 1;
        if (todaysTop3[0]) {
          todaysTopMaxOrderCount = todaysTop3[0].order_count;
        }

        let todaysBottom3 = todays.slice(0, 3);
        todaysBottom3.reverse();

        let todaysBottomMaxOrderCount = 1;
        if (todaysBottom3[0]) {
          todaysBottomMaxOrderCount = todaysBottom3[0].order_count;
        }

      //updating state
        setTodaysTopMaxOrderCount(todaysTopMaxOrderCount);
        setTodaysBottomMaxOrderCount(todaysBottomMaxOrderCount);
        
        setTodaysTop3(todaysTop3);
        setTodaysBottom3(todaysBottom3);
      } catch {
        makeSnackBar("Something went wrong", "error");
      }
    } else {
      makeSnackBar("Something went wrong", "error");
    }
  }, [ props.todaysCitiesOrders ]);

  //to keep trace if any error is coming in fetching week's cities orders from api
  useEffect(() => {
    if( props.weeklyCitiesOrders.error === 0 ) {
      //getting weekly top/bottom cities
      try {
        const weekly = props.weeklyCitiesOrders.data;

        let weeklyTop3 = [...weekly]; //copying weekly array to weeklyTop3 array
        weeklyTop3 = weeklyTop3.reverse();
        weeklyTop3 = weeklyTop3.slice(0, 3);

        let weeklyTopMaxOrderCount = 1;
        if (weeklyTop3[0]) {
          weeklyTopMaxOrderCount = weeklyTop3[0].order_count;
        }

        const weeklyBottom3 = weekly.slice(0, 3);
        weeklyBottom3.reverse();

        let weeklyBottomMaxOrderCount = 1;
        if (weeklyBottom3[0]) {
          weeklyBottomMaxOrderCount = weeklyBottom3[0].order_count;
        }

        //updating state
        setWeeklyTopMaxOrderCount(weeklyTopMaxOrderCount);
        setWeeklyBottomMaxOrderCount(weeklyBottomMaxOrderCount);

        setWeeklyTop3(weeklyTop3);
        setWeeklyBottom3(weeklyBottom3);
      } catch {
        makeSnackBar("Something went wrong", "error");
      }
    } else {
      makeSnackBar("Something went wrong", "error");
    }
  }, [ props.weeklyCitiesOrders ]);

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

  //function to style graph pillar as per its order count and position
  const graphPillarStyle = (max_count, count, idx) => {
    const graphBox_Height = graphBoxHeight - 30;
    const pillarHeight =
      Math.floor((graphBox_Height * count) / max_count) || 17; // min height of 17 will be there in case of max_count = 0

    if (idx === 0) {
      return {
        backgroundColor: "#9bf594",
        height: pillarHeight,
      };
    } else if (idx === 1) {
      return {
        backgroundColor: "#f1b56e",
        height: pillarHeight,
      };
    } else {
      return {
        backgroundColor: "#e95757",
        height: pillarHeight,
      };
    }
  };

  //rendering
  return (
    <div>
      {
        //redirecting to admin home page
        redirectToAdminHome ? <Redirect to={"/admin"} /> : null
      }

      <AdminNavBar active="dashboard" />
      <br />
      <br />
      <br />

      <div className="row dashPageContent">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 dashbordPartContainer">
          <h2>Today</h2>
          <div className="graphContainer">
            <h5>Top 3 Cities</h5>
            <div className="graph" style={{ height: graphBoxHeight }}>
              <LoadingAnimation loading={loading} />

              {todaysTop3.map((item, idx) => {
                return (
                  <div key={idx} className="graphPillarBox">
                    <div
                      className="graphPillar"
                      style={graphPillarStyle(
                        todaysTopMaxOrderCount,
                        item.order_count,
                        idx
                      )}
                    >
                      {item.order_count}
                    </div>
                    <span className="graphPillarTitle">{item.city_name}</span>
                  </div>
                );
              })}
            </div>

            <hr />

            <h5>Bottom 3 Cities</h5>
            <div className="graph" style={{ height: graphBoxHeight }}>
              <LoadingAnimation loading={loading} />

              {todaysBottom3.map((item, idx) => {
                return (
                  <div key={idx} className="graphPillarBox">
                    <div
                      className="graphPillar"
                      style={graphPillarStyle(
                        todaysBottomMaxOrderCount,
                        item.order_count,
                        idx
                      )}
                    >
                      {item.order_count}
                    </div>
                    <span className="graphPillarTitle">{item.city_name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 dashbordPartContainer">
          <h2>Weekly</h2>
          <div className="graphContainer">
            <h5>Top 3 Cities</h5>
            <div className="graph" style={{ height: graphBoxHeight }}>
              <LoadingAnimation loading={loading} />

              {weeklyTop3.map((item, idx) => {
                return (
                  <div key={idx} className="graphPillarBox">
                    <div
                      className="graphPillar"
                      style={graphPillarStyle(
                        weeklyTopMaxOrderCount,
                        item.order_count,
                        idx
                      )}
                    >
                      {item.order_count}
                    </div>
                    <span className="graphPillarTitle">{item.city_name}</span>
                  </div>
                );
              })}
            </div>

            <hr />

            <h5>Bottom 3 Cities</h5>
            <div className="graph" style={{ height: graphBoxHeight }}>
              <LoadingAnimation loading={loading} />

              {weeklyBottom3.map((item, idx) => {
                return (
                  <div key={idx} className="graphPillarBox">
                    <div
                      className="graphPillar"
                      style={graphPillarStyle(
                        weeklyBottomMaxOrderCount,
                        item.order_count,
                        idx
                      )}
                    >
                      {item.order_count}
                    </div>
                    <span className="graphPillarTitle">{item.city_name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
    todaysCitiesOrders: state.todaysCitiesOrders,
    weeklyCitiesOrders: state.weeklyCitiesOrders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return  {
    fetchTodaysTopBottomCitiesAction: () => { dispatch(fetchTodaysTopBottomCitiesAction()) },
    fetchWeeklyTopBottomCitiesAction: () => { dispatch(fetchWeeklyTopBottomCitiesAction()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( AdminDashboard );

