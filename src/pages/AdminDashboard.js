import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import AdminNavBar from "../components/AdminNabBar";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { getDecryptedCookieValue } from "../utils";
import {
  fetchTodaysTopBottomCities,
  fetchWeeklyTopBottomCities,
} from "../apis";

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

      //getting today's top/bottom cities and weekly top/bottom cities from api
      try {
        const response1 = await fetchTodaysTopBottomCities();
        const response2 = await fetchWeeklyTopBottomCities();
        if (response1 && response2) {
          const todays = response1;
          const weekly = response2;

          //getting todays top/bottom cities
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

          //getting weekly top/bottom cities
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
          setTodaysTopMaxOrderCount(todaysTopMaxOrderCount);
          setTodaysBottomMaxOrderCount(todaysBottomMaxOrderCount);
          setWeeklyTopMaxOrderCount(weeklyTopMaxOrderCount);
          setWeeklyBottomMaxOrderCount(weeklyBottomMaxOrderCount);

          setTodaysTop3(todaysTop3);
          setTodaysBottom3(todaysBottom3);
          setWeeklyTop3(weeklyTop3);
          setWeeklyBottom3(weeklyBottom3);
        } else {
          await makeSnackBar("Something went wrong", "error");
        }
      } catch {
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

export default AdminDashboard;
