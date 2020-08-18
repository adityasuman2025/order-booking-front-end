import React, { Component } from 'react';

import PaginationView from "../components/PaginationView";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { pagination_size } from "../constants";
import { fetchProducts } from "../apis";
import { makeEncryptedCookie } from "../utils";

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

			await this.setState({
				paginationTotalItems: total_items,
				products: results
			});
			
			await this.setState({
				paginationVisible: true,
			});
		} else {
			await this.makeSnackBar( "Something went wrong", "error" );
		}

		await this.toogleLoadingAnimation(); //hiding loading animation
	}

//function to handle when any pagination btn is pressed
	onPaginationBtnClick = async ( index ) => {
		this.toogleLoadingAnimation(); //displaying loading animation

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
			this.makeSnackBar( "Something went wrong", "error" );
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

//when any product is clicked on
	handleProductClicked = async ( item ) => {
		const selected_product_name_cookie = await makeEncryptedCookie( "order_booking_selected_product_name", item.name );
		if( selected_product_name_cookie ) {
			this.props.history.push( '/user/order/' + item.id );
		} else {
			await this.makeSnackBar( "Something went wrong", "error" );    
		}
	}

//rendering
	render() {
		return (
			<div>
				<div className="pageContent">
					<h2>
						Choose any product to book order
					</h2>
					<br />

					{
					//listing products
						this.state.products.map( ( item, idx ) => {
							return(
								<div 
									key={idx} 
									className="row productList" 
									onClick={ () => this.handleProductClicked( item ) } >
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productText">
										{ item.name }
										<span style={{ float: "right", fontWeight: 400, fontSize: '87%' }}>
											{ "Rs. " + item.price }
										</span>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										{ item.description }
									</div>
								</div>
							)
						})
					}

					<LoadingAnimation loading={ this.state.loading } />
				</div>

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