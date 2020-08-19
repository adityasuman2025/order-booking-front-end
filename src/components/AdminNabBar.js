import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { project_name } from "../constants";

function AdminNabBar(props) {
  const [mobileNavBarToggler, setMobileNavBarToggler] = useState(false);

  //function to toggle mobile menu
  const handleMobileNavBarToggler = () => {
    setMobileNavBarToggler(!mobileNavBarToggler);
  };

  //rendering
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark noPadding">
      <div id="navbar-brand" className="navbar-brand navBarBrand">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <img
            className="navLogoImg"
            alt="logo"
            src={require("../img/logo.png")}
          />{" "}
          {project_name}
        </Link>
      </div>

      <button
        id="mobileNavBarToggler"
        onClick={handleMobileNavBarToggler}
        className="navbar-toggler"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        id="navbarCollapse"
        className={classNames(
          "navbar-collapse",
          { collapse: !mobileNavBarToggler },
          { display: mobileNavBarToggler }
        )}
        // className={ this.state.mobileNavBarToggler === false ? "collapse " : "display" }
      >
        <ul className="navbar-nav mr-auto navWebMenu">
          <li
            className={classNames("nav-item", {
              active: props.active === "dashboard",
            })}
          >
            <Link className="nav-link" to="/admin/dashboard">
              Dashboard
            </Link>
          </li>
          <li
            className={classNames("nav-item", {
              active: props.active === "filter",
            })}
          >
            <Link className="nav-link" to="/admin/filter">
              Filter
            </Link>
          </li>
          <li
            className={classNames("nav-item", {
              active: props.active === "create_product",
            })}
          >
            <Link className="nav-link" to="/admin/create-product">
              Create Product
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminNabBar;
