import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { project_name } from "../constants";

class AdminNabBar extends Component {
	constructor(){
	    super();
	   
	    this.state = {
		    mobileNavBarToggler: false,
	    };
  	}

//function to toggle mobile menu 
	handleMobileNavBarToggler = () => {
		this.setState({
			mobileNavBarToggler: !this.state.mobileNavBarToggler
		});
	}

//rendering
	render() {
		return(
			<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark noPadding" >
				<div id="navbar-brand" className="navbar-brand navBarBrand">
					<img className="navLogoImg" alt="logo image" src={ require("../img/logo.png") } /> { project_name }
				</div>

				<button id="mobileNavBarToggler" onClick={ this.handleMobileNavBarToggler } className="navbar-toggler" >
			        <span className="navbar-toggler-icon"></span>
		      	</button>

				<div
					id="navbarCollapse"
				  	className={ classNames( 'navbar-collapse', { 'collapse': !this.state.mobileNavBarToggler }, { 'display': this.state.mobileNavBarToggler } ) }
					// className={ this.state.mobileNavBarToggler === false ? "collapse " : "display" }
				>
		      		<ul className="navbar-nav mr-auto navWebMenu" >
	      				<li className={ this.props.active === "dashboard" ? "nav-item active" : "nav-item" } ><Link className="nav-link" to="/admin/dashboard">Dashboard</Link></li>
						<li className={ this.props.active === "filter" ? "nav-item active" : "nav-item" } ><Link className="nav-link"  to="/admin/filter">Filter</Link></li>
						<li className={ this.props.active === "create_product" ? "nav-item active" : "nav-item" } ><Link className="nav-link"  to="/admin/create-product">Create Product</Link></li>
		      		</ul>
		      	</div>
			</nav>
		)
	}
}

export default AdminNabBar;