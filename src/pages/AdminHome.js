import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import CircularButton from "../components/CircularButton";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { verifyAdmin } from "../apis";
import { makeEncryptedCookie, getDecryptedCookieValue } from "../utils";

function AdminHome(props) {
    const [ loading, setLoading ] = useState( true );
    
    const [ snackBarVisible, setSnackBarVisible ] = useState( false );
    const [ snackBarMsg, setSnackBarMsg ] = useState( "" );
    const [ snackBarType, setSnackBarType ] = useState( "success" );
    
    const [ enteredPhoneNo, setEnteredPhoneNo ] = useState( "" );
    const [ redirectToAdminDashboard, setRedirectToAdminDashboard ] = useState( false );

//componentDidMount
    useEffect( () => {
        const componentDidMount = async () => {
        //checking if admin is already logged or not
            const isAdminLogged = await getDecryptedCookieValue( "order_booking_admin_logged" );
            if( isAdminLogged == 1 ) {
            //if admin is already logged then redirecting to admin dashboard page
                await setRedirectToAdminDashboard( true );
                return;
            }

            await hideLoadingAnimation(); //hiding loading animation
        }

        componentDidMount();
    }, []);

//function to make a snack-bar
    const makeSnackBar = async ( msg, type ) => {
        await setSnackBarMsg( msg );
        await setSnackBarType( type );

        await setSnackBarVisible( true );
    }

//function to close snack-bar
    const handleSnackBarClose = () => {
        setSnackBarVisible( false );
    }

//function to toogle loadiing animation
    const displayLoadingAnimation = async () => {
        await setLoading( true );
    }

    const hideLoadingAnimation = async () => {
        await setLoading( false );
    }

//when login btn is pressed 
	const onLoginPressed = async (e) => {
		e.preventDefault();
        await displayLoadingAnimation(); //displaying loading animation

	//verifying entered data
		const entered_PhoneNo = enteredPhoneNo.trim();
		if( entered_PhoneNo != "" ) {
            const response = await verifyAdmin( entered_PhoneNo );
            if( response ) {
                const res = response[0];
            	if( res.is_admin == 1 ) {
                //redirecting to admin dashboard page
                    const logged_admin_cookie = await makeEncryptedCookie( "order_booking_admin_logged", "1" );
                    if( logged_admin_cookie ) {
                        setRedirectToAdminDashboard( true );
                        return;
                    }
				} else {
					await makeSnackBar( "This phone no is not admin", "error" );    
				}
            } else {
                await makeSnackBar( "This phone no is not registered", "error" );
            }
		} else {
			await makeSnackBar( "Please enter phone no", "error" );
		}

        await hideLoadingAnimation(); //hiding loading animation
    }

//rendering
    return (
        <div>
            {
            //redirecting to admin home page 
                redirectToAdminDashboard ? <Redirect to='/admin/dashboard' /> : null 
            }

            <div className="pageContent center">
                <br /><br /><br /><br />
                <h2>
                    Admin Login
                </h2>
                <br />

                <form onSubmit={ onLoginPressed }>
                    <label className="labelBox">
                        Phone no
                        <br />
                        <input 
                            type="number"
                            required
                            className="inputBox inputBox2" 
                            // placeholder="first name" 
                            name="enteredPhoneNo" 
                            value={ enteredPhoneNo }
                            onChange={ ( e ) => setEnteredPhoneNo( e.target.value ) } />
                    </label>
                    <br /><br />

                    <CircularButton text="Login" onClick={ onLoginPressed }/>
                </form>
                <br />

                <LoadingAnimation loading={ loading } />
            </div>

            <SnackBar 
                open={ snackBarVisible } 
                msg={ snackBarMsg } 
                type={ snackBarType }
                handleClose={ handleSnackBarClose } />
        </div>
    )
}

export default AdminHome;