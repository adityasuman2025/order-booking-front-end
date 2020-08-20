import React, { useState, useEffect } from "react";

import PaginationView from "../components/PaginationView";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { pagination_size } from "../constants";
import { fetchProducts } from "../apis";
import { makeEncryptedCookie } from "../utils";

function UserHome(props) {
  const [loading, setLoading] = useState(true);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [snackBarType, setSnackBarType] = useState("success");

  const [products, setProducts] = useState([]);

  const [baseAPIEndPoint, setBaseAPIEndPoint] = useState(
    "get-products-list/?format=json"
  );

  const [paginationVisible, setPaginationVisible] = useState(false);
  const [paginationTotalItems, setPaginationTotalItems] = useState(0);
  const [paginationActivePage, setPaginationActivePage] = useState(0);

  //componentDidMount
  useEffect(() => {
    const componentDidMount = async () => {
      //by default first page of products will be listed
      await fetchAndDisplayProducts(baseAPIEndPoint);
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

  //function to handle when any pagination btn is pressed
  const onPaginationBtnClick = async (index) => {
    await displayLoadingAnimation(); //displaying loading animation

    //loading the selected page content
    let api_end_point = baseAPIEndPoint;
    if (index > 0) {
      const page = index + 1;
      api_end_point += "&page=" + page;
    }

    await fetchAndDisplayProducts(api_end_point);
    
    //highlighting the selected page btn
    await setPaginationActivePage(index);
    
    await hideLoadingAnimation(); //hiding loading animation
  };

  //function to fetch and dispay products as per pagination
  const fetchAndDisplayProducts = async (baseAPI_EndPoint) => {
    try {
      const response = await fetchProducts(baseAPI_EndPoint);
      if (response) {
        const total_items = response.count;
        const results = response.results;

        await setProducts(results);

        await setPaginationTotalItems(total_items);
        await setPaginationVisible(true);
      } else {
        await makeSnackBar("Something went wrong", "error");
      }
    } catch {
      await makeSnackBar("Something went wrong", "error");
    }
  };

  //when any product is clicked on
  const handleProductClicked = async (item) => {
    const selected_product_name_cookie = await makeEncryptedCookie(
      "order_booking_selected_product_name",
      item.name
    );
    if (selected_product_name_cookie) {
      props.history.push("/user/order/" + item.id);
    } else {
      await makeSnackBar("Something went wrong", "error");
    }
  };

  //rendering
  return (
    <div>
      <div className="pageContent">
        <h2>Choose any product to book order</h2>
        <br />

        {
          //listing products
          products.map((item, idx) => {
            return (
              <div
                key={idx}
                className="row productList"
                onClick={() => handleProductClicked(item)}
              >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productText">
                  {item.name}
                  <span className="productPrice floatRight">
                    {"Rs. " + item.price}
                  </span>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productDateTimeText">
                  {item.description}
                </div>
              </div>
            );
          })
        }

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

export default UserHome;
