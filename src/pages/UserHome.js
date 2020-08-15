import React, { Component } from 'react';

import PaginationView from "../components/PaginationView";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { pagination_size } from "../global";
import { fetchProducts } from "../helperFunctions";

class UserHome extends Component {
	constructor(){
	    super();
	   
	    this.state = {
			loading: true,

			baseAPIEndpoint: "get-products-list/?format=json",

			products: [],

			snackBarVisible: false,
			snackBarMsg: "",
			snackBarType: "success",

			paginationVisible: false,
			paginationTotalItems: 0,
			padinationActivePage: 0,
	    };
  	}

  	componentDidMount = async () => {
	//by default first page of products will be listed
		const response = await fetchProducts ( this.state.baseAPIEndpoint );
		if( response ) {
			const total_items = response.count;
			const results = response.results;

			this.setState({
				paginationTotalItems: total_items,
				products: results
			});
			
			this.setState({
				paginationVisible: true,
			});
		} else {
			this.makeSnackBar( "something went wrong", "error" );
		}

		this.toogleLoadingAnimation(); //hiding loading animation
	}

//function to handle when any pagination btn is pressed
	onPaginationBtnClick = async ( index ) => {
	//highlighting the selected page btn
		await this.setState({
			padinationActivePage: index,
		});

	//loading the selected page content
		let api_end_point = this.state.baseAPIEndpoint;
		if( index > 0 ) {
			const page = index + 1;
			api_end_point += "&page=" + page;
		}
		const response = await fetchProducts ( api_end_point );
		if( response ) {
			const results = response.results;
			this.setState({
				products: results
			});
		} else {
			this.makeSnackBar( "something went wrong", "error" );
		}
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

				{
				//pagination area
					this.state.paginationVisible ?
						<PaginationView 
							total_items={ this.state.paginationTotalItems } 
							pagination_size={ pagination_size }
							active_page_no={ this.state.padinationActivePage }
							onPaginationBtnClick={ this.onPaginationBtnClick }
						/>
					: null
				}

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