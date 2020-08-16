import React, {Component} from 'react';

import CircularButton from "../components/CircularButton";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";
import SuccesMsg from "../components/SuccesMsg";

import { getDecryptedCookieValue, fetchCities, BookUserOrder } from "../helperFunctions";

class UserBookOrder extends Component {
    constructor(){
	    super();
	   
	    this.state = {
            loading: true,

            productID: 0,
            
            cities: [],

			snackBarVisible: false,
			snackBarMsg: "",
            snackBarType: "success",
            
            formVisible: true,

            enteredProductName: "",
            enteredPhoneNo: "",
            selectedCity: 0,
        };
  	}

  	componentDidMount = async () => {
    //getting product name and phone number from cookie
        const product_id = this.props.match.params.product_id;
        await this.setState({
            productID: product_id,
            enteredProductName: await getDecryptedCookieValue( "order_booking_selected_product_name" ) || "",
            enteredPhoneNo: await getDecryptedCookieValue( "order_booking_user_phone_no" ) || 0,
        });

    //fetching all cities list from api
        const response = await fetchCities();
		if( response ) {
			await this.setState({
                cities: response,
            });
		} else {
			await this.makeSnackBar( "Something went wrong", "error" );
        }
        
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

//when an input box content is changed in add question dialog box
    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

//function to hanlde when book btn is pressed
    onBookPressed = async (e) => {
        e.preventDefault();

        await this.toogleLoadingAnimation(); //displaying loading animation

    //verifying if all input data is correct
        const user_phone_no = this.state.enteredPhoneNo.trim();
        const product_id = this.state.productID;
        const city_id = this.state.selectedCity;

        if( city_id == 0 ) {
            await this.makeSnackBar( "Please select a city", "error" );
            await this.toogleLoadingAnimation(); //hiding loading animation
            return;
        }

        if( product_id == 0 ) {
            await this.makeSnackBar( "Invalid product", "error" );
            await this.toogleLoadingAnimation(); //hiding loading animation
            return;
        }

        if( user_phone_no == "" ) {
            await this.makeSnackBar( "Invalid Phone Number", "error" );
            await this.toogleLoadingAnimation(); //hiding loading animation
            return;
        }
        
    //all good //sending rqst to api to book an order of the user
        const response = await BookUserOrder( user_phone_no, product_id, city_id  );
		if( response ) {
        //hiding form and displaying success msg
            await this.setState({
                formVisible: false,
            });

			await this.makeSnackBar( "Your order successfully booked", "success" );
		} else {
			await this.makeSnackBar( "Something went wrong", "error" );
        }
        
        await this.toogleLoadingAnimation(); //hiding loading animation
    }
//rendering
    render() {
        return (
            <div>
                <div className="pageContent center">
                    <br /><br /><br /><br />
                    <h2>
                        Book Your Order
                    </h2>
                    <br />

                    {
                        this.state.formVisible ? 
                            <form onSubmit={ this.onBookPressed }>
                                <label className="labelBox">
                                    Product
                                    <br />
                                    <div className="inputBox inputBox2" >
                                        { this.state.enteredProductName }
                                    </div>
                                </label>
                                <br /><br />
                                
                                <label className="labelBox">
                                    Phone Number
                                    <br />
                                    <div className="inputBox inputBox2" >
                                        { this.state.enteredPhoneNo }
                                    </div>
                                </label>
                                <br /><br />

                                <label className="labelBox">
                                    City
                                    <br />
                                    <select 
                                        type="number" 
                                        className="inputBox inputBox2" 
                                        name="selectedCity" 
                                        value={ this.state.selectedCity }
                                        onChange={ this.onChange } 
                                    >
                                        <option value="0" >select city</option>
                                        {
                                            this.state.cities.map( (item, idx ) => {
                                                return (
                                                    <option key={ idx } value={ item.id } >{ item.name }</option>
                                                )
                                            })
                                        }
                                    </select>
                                </label>
                                <br /><br />

                                <CircularButton text="Book" style={{ width: 180 }} onClick={ this.onBookPressed }/>
                            </form>
                        :
                            <SuccesMsg 
                                successMsg="Your order successfully booked" 
                                redirectToName="Home"
                                redirectToUrl="/user"
                            />
                    }
                    
                    <br />
                    <LoadingAnimation loading={ this.state.loading } />
                </div>

                <SnackBar 
					open={ this.state.snackBarVisible } 
					msg={ this.state.snackBarMsg } 
					type={ this.state.snackBarType }
					handleClose={ this.handleSnackBarClose } />
            </div>
        );
    }
}

export default UserBookOrder;