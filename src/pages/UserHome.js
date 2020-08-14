import React, { Component } from 'react';

import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { pagination_size } from "../global";
import { fetchProducts } from "../helperFunctions";

class UserHome extends Component {
	constructor(){
	    super();
	   
	    this.state = {
			loading: true,
	    };
  	}

  	componentDidMount = async () => {
	//by default first page of products will be listed
		await fetchProducts ( "get-orders-list/?format=json" );
		this.toogleLoadingAnimation(); //hiding loading animation
	}

//function to toogle loadiing animation
	toogleLoadingAnimation = ( ) => {
		this.setState({
			loading: !this.state.loading,
		});
	}

//rendering
	render() {
	//rendering
		return (
			<div>
				user home

				<LoadingAnimation loading={ this.state.loading } />

				{/* <SnackBar open={true} msg="high frnd" type="success" /> */}
			</div>
		);
	}
}

export default UserHome;