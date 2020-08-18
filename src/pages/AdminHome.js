import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import CircularButton from "../components/CircularButton";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { verifyAdmin } from "../apis";
import { makeEncryptedCookie, getDecryptedCookieValue } from "../utils";

class AdminHome extends Component {
	constructor(){
	    super();

	    this.state = {
            loading: true,

			snackBarVisible: false,
			snackBarMsg: "",
            snackBarType: "success",

            enteredPhoneNo: "",

			redirectToAdminDashboard: false,
        };
  	}

	componentDidMount = async () => {
	//checking if admin is already logged or not
		const isAdminLogged = await getDecryptedCookieValue( "order_booking_admin_logged" );
		if( isAdminLogged == 1 ) {
		//if admin is already logged then redirecting to admin dashboard page
			this.setState({
				redirectToAdminDashboard: true,
			});
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

//when login btn is pressed 
	onLoginPressed = async (e) => {
		e.preventDefault();

		this.toogleLoadingAnimation(); //displaying loading animation

	//verifying entered data
		const enteredPhoneNo  	= this.state.enteredPhoneNo.trim();
		if( enteredPhoneNo != "" ) {
            const response = await verifyAdmin( enteredPhoneNo );
            if( response ) {
                const res = response[0];
            	if( res.is_admin == 1 ) {
                //redirecting to admin dashboard page
                    const logged_admin_cookie = await makeEncryptedCookie( "order_booking_admin_logged", "1" );
                    if( logged_admin_cookie ) {
                        this.setState({
                            redirectToAdminDashboard: true,
                        });

                        return;
                    }
				} else {
					await this.makeSnackBar( "This phone no is not admin", "error" );    
				}
            } else {
                await this.makeSnackBar( "This phone no is not registered", "error" );
            }
		} else {
			await this.makeSnackBar( "Please enter phone no", "error" );
		}

		await this.toogleLoadingAnimation(); //hiding loading animation
	}

//rendering
	render() {
	//redirecting to admin dashboard page
		if( this.state.redirectToAdminDashboard ) {
			return (<Redirect to={'/admin/dashboard'}/>)
		}

	//rendering
		return (
			<div>
                <div className="pageContent center">
                    <br /><br /><br /><br />
                    <h2>
                        Admin Login
                    </h2>
                    <br />

                    <form onSubmit={ this.onLoginPressed }>
                        <label className="labelBox">
                            Phone no
                            <br />
                            <input 
                                type="number"
                                required
                                className="inputBox inputBox2" 
                                // placeholder="first name" 
                                name="enteredPhoneNo" 
                                value={ this.state.enteredPhoneNo }
                                onChange={ this.onChange } />
                        </label>
                        <br /><br />

                        <CircularButton text="Login" style={{ width: 180 }} onClick={ this.onLoginPressed }/>
                    </form>
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

export default AdminHome;