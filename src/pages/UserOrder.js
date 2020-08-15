import React, {Component} from 'react';

import CircularButton from "../components/CircularButton";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { getDecryptedCookieValue, makeEncryptedCookie, checkUserExistsWithGivenPhoneNumber } from "../helperFunctions";

class UserOrder extends Component {
    constructor(){
	    super();
	   
	    this.state = {
            loading: true,

			productID: 0,

			snackBarVisible: false,
			snackBarMsg: "",
            snackBarType: "success",
            
            enteredPhoneNo: 0,
        };
  	}

  	componentDidMount = async () => {
	//by default first page of products will be listed
        const product_id = this.props.match.params.product_id;
        await this.setState({
            productID: product_id,
            enteredPhoneNo: await getDecryptedCookieValue( "order_booking_user_phone_no" ) || 0,
        });

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

//when proceed btn is pressed
    onProceedPress = async (e) => {
        e.preventDefault();

        await this.toogleLoadingAnimation(); //showing loading animation

    //checking if some phone no is entered 
        const enteredPhoneNo = this.state.enteredPhoneNo;
        if( enteredPhoneNo == 0 ) {
            await this.makeSnackBar( "Please enter a phone number", "error" );
        } else {
            const response = await checkUserExistsWithGivenPhoneNumber( enteredPhoneNo );
            if( response == 1 ) {
                const product_id = await this.state.productID;;

            //making of the phone no entered by user and redirecting to book-order page
                const enteredPhoneNo_cookie = await makeEncryptedCookie( "order_booking_user_phone_no", enteredPhoneNo );
                if( enteredPhoneNo_cookie ) {
                    this.props.history.push( '/user/book-order/' + product_id )
                } else {
                    await this.makeSnackBar( "Something went wrong", "error" );    
                }
            } else if ( response == 0 ){
                await this.makeSnackBar( "This phone number is not registered. Please Create a User to continue", "error" );
            } else {
                await this.makeSnackBar( "Something went wrong", "error" );
            }
        }
        await this.toogleLoadingAnimation(); //hiding loading animation
    }

//when an input box content is changed in add question dialog box
    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
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

                    <form onSubmit={ this.onProceedPress }>
                        <label>
                            enter your phone number
                            <br />
                            <input 
                                type="number" 
                                className="inputBox" 
                                placeholder="phone number" 
                                name="enteredPhoneNo" 
                                value={ this.state.enteredPhoneNo }
                                onChange={ this.onChange } />
                        </label>
                        <br /><br />

                        <CircularButton text="Proceed" style={{ width: 180 }} onClick={ this.onProceedPress }/>
                    </form>
                    <br />
                    <button 
                        className="btn coloredTextBtn"
                        onClick={ () => { this.props.history.push( '/user/create-user' ) } }
                    >
                        CREATE USER
                    </button>

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

export default UserOrder;