import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { project_name } from "../global";

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
			<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" style={{ padding: 0, }}>
				<div id="navbar-brand" className="navbar-brand" style={{ padding: 10, paddingLeft: 15, fontSize: "125%", }}>
					<img className="navLogoImg" alt="logo image" src={ require("../img/logo.png") } /> { project_name }
				</div>

				<button style={{ marginRight: 5, }} id="mobileNavBarToggler" onClick={ this.handleMobileNavBarToggler } className="navbar-toggler" >
			        <span className="navbar-toggler-icon"></span>
		      	</button>

		      	<div className={ this.state.mobileNavBarToggler === false ? "collapse navbar-collapse" : "navbar-collapse display" } id="navbarCollapse">
		      		<ul className="navbar-nav mr-auto" style={{ marginRight: 10, marginLeft: 10, }}>
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