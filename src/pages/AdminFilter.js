import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import PaginationView from "../components/PaginationView";
import AdminNavBar from "../components/AdminNabBar";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { pagination_size } from "../global";
import { getDecryptedCookieValue, fetchCities, fetchOrdersByCity, formatDateTime } from "../helperFunctions";

class AdminFilter extends Component {
    constructor(){
	    super();
	   
	    this.state = {
            loading: true,

            cities: [],
            selectedCity: 0, //by default All is selected

            orders: [],

            baseAPIEndPoint: "get-orders-by-city-list/?format=json&city=",
            
            paginationVisible: false,
			paginationTotalItems: 0,
            padinationActivePage: 0,
            
			snackBarVisible: false,
			snackBarMsg: "",
            snackBarType: "success",
			
            redirectToAdminHome: false,
        };
  	}

	componentDidMount = async () => {
    //checking if admin is logged or not
        const isAdminLogged = await getDecryptedCookieValue( "order_booking_admin_logged" );
        if( isAdminLogged != 1 ) {
        //if admin is not logged then redirecting to admin home page
            this.setState({
                redirectToAdminHome: true,
            });
        }

    //fetching all cities list from api
        const response = await fetchCities();
		if( response ) {
			await this.setState({
                cities: response,
            });
		} else {
			await this.makeSnackBar( "Something went wrong", "error" );
        }

    //by default "All" cities orders will be displayed
        const selectedCity = await this.state.selectedCity;
		await this.fetchAndDisplayOrders( selectedCity );
        
        await this.toogleLoadingAnimation(); //hiding loading animation
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

// when a city is selected from drop down menu
    onSelectACity = async (e) => {
        const selectedCity = e.target.value;
        this.setState({ [e.target.name]: selectedCity });

        await this.toogleLoadingAnimation(); //displaying loading animation

    //fetching orders of that city from api
        await this.fetchAndDisplayOrders( selectedCity );
        
        await this.toogleLoadingAnimation(); //hiding loading animation
    }

//function to fetch and display order list
    fetchAndDisplayOrders = async ( city_id ) => {
        const baseAPIEndpoint = await this.state.baseAPIEndPoint + city_id;
        const response = await fetchOrdersByCity( baseAPIEndpoint );
		if( response ) {
			const total_items = response.count;
			const results = response.results;

			await this.setState({
                baseAPIEndpoint: baseAPIEndpoint,
				paginationTotalItems: total_items,
				orders: results,
			});
			
			await this.setState({
				paginationVisible: true,
			});
		} else {
			await this.makeSnackBar( "Something went wrong", "error" );
        }
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
        const response = await fetchOrdersByCity( api_end_point );
        if( response ) {
            const results = response.results;
            this.setState({
                orders: results
            });
        } else {
            this.makeSnackBar( "Something went wrong", "error" );
        }

        this.toogleLoadingAnimation(); //hiding loading animation
    }

//rendering
    render() {
    //redirecting to admin home page
		if( this.state.redirectToAdminHome ) {
			return (<Redirect to={'/admin'}/>)
        }
        
    //rendering
        return (
            <div>
                <AdminNavBar active="filter" />
                <br/><br/>

                <div className="pageContent">
                    <center>
                        <select 
                            className="inputBox inputBox2" 
                            name="selectedCity" 
                            value={ this.state.selectedCity }
                            onChange={ this.onSelectACity } >
                            <option value="0" >All</option>
                            {
                                this.state.cities.map( (item, idx ) => {
                                    return (
                                        <option key={ idx } value={ item.id } >{ item.name }</option>
                                    )
                                })
                            }
                        </select>
                    </center>
                    <br />
                    
                    <div className="container">
                    {
					//listing orders of the selected city
						this.state.orders.map( ( item, idx ) => {
							return(
								<div 
									key={idx} 
                                    className="row productList"
                                    style={{ cursor: "default" }} >
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 productText">
										{ item.product.name }
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 orderUserName">
										{ "Rs. " + item.product.price }
									</div>
                                    
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productDateTimeText">
										{ formatDateTime( item.added_on ) }
									</div>
								</div>
							)
						})
					}
                    </div>

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

export default AdminFilter;