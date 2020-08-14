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

			snackBarVisible: false,
			snackBarMsg: "",
			snackBarType: "success",
	    };
  	}

  	componentDidMount = async () => {
	//by default first page of products will be listed
		const api_endpoint = "get-orders-list/?format=json";
		const response = await fetchProducts ( api_endpoint );
		if( response ) {
			console.log(response);
			this.makeSnackBar( "succeed", "success" );

		} else {
			this.makeSnackBar( "something went wrong", "error" );
		}

		this.toogleLoadingAnimation(); //hiding loading animation
	}

//function to make a snack-bar
	makeSnackBar = ( msg, type ) => {
		this.setState({
			snackBarVisible: true,
			snackBarMsg: msg,
			snackBarType: type,
		});
	}

//function to close snack-bar
	handleSnackBarClose = () => {
        this.setState({
            snackBarVisible: false
        });
    }
	
//function to toogle loadiing animation
	toogleLoadingAnimation = ( ) => {
		this.setState({
			loading: !this.state.loading,
		});
	}

//rendering
	render() {
		return (
			<div>
				user home

				<LoadingAnimation loading={ this.state.loading } />

				<SnackBar 
					open={ this.state.snackBarVisible } 
					msg={ this.state.snackBarMsg } 
					type={ this.state.snackBarType }
					handleClose={ this.handleSnackBarClose } />
			</div>
		);
	}
}

export default UserHome;