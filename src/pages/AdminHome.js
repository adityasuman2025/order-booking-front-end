import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import CircularButton from "../components/CircularButton";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { makeEncryptedCookie } from "../helperFunctions";
import { admin_username, admin_password } from "../global";

class AdminHome extends Component {
	constructor(){
	    super();
	   
	    this.state = {
            loading: true,

			snackBarVisible: false,
			snackBarMsg: "",
            snackBarType: "success",
            
            enteredUsername: "",
			enteredPassword: "",
			
			redirectToAdminDashboard: false,
        };
  	}

	componentDidMount = async () => {
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

	//verifying if entered data
		const enteredUsername  	= this.state.enteredUsername.trim();
		const enteredPassword 	= this.state.enteredPassword.trim();

		if( enteredUsername != "" && enteredPassword != "" ) {
			if( enteredUsername == admin_username && enteredPassword == admin_password ) {
			//making cookie/token of logged admin
				const logged_admin_cookie = await makeEncryptedCookie( "order_booking_admin_logged", "1" );
				if( logged_admin_cookie ) {
				//redirecting to admin dashboard page
					this.setState({
						redirectToAdminDashboard: true,
					});
				} else {
					await this.makeSnackBar( "Something went wrong", "error" );    
				}
			} else {
				await this.makeSnackBar( "Username or password is not correct", "error" );
			}
		} else {
			await this.makeSnackBar( "Please fill all the fields", "error" );
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
                            Username
                            <br />
                            <input 
                                type="text"
                                required
                                className="inputBox inputBox2" 
                                // placeholder="first name" 
                                name="enteredUsername" 
                                value={ this.state.enteredUsername }
                                onChange={ this.onChange } />
                        </label>
                        <br /><br />

                        <label className="labelBox">
                            Password
                            <br />
                            <input 
                                type="password" 
                                required
                                className="inputBox inputBox2" 
                                // placeholder="second name" 
                                name="enteredPassword" 
                                value={ this.state.enteredPassword }
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