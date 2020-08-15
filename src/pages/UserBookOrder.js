import React, {Component} from 'react';

import CircularButton from "../components/CircularButton";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { validateUsername, validateContactNo, createUser } from "../helperFunctions";

class UserBookOrder extends Component {
    constructor(){
	    super();
	   
	    this.state = {
            loading: true,

			baseAPIEndpoint: "get-products-list/?format=json",

			snackBarVisible: false,
			snackBarMsg: "",
            snackBarType: "success",
            
            enteredFirstName: "",
            enteredSecondName: "",
            enteredPhoneNo: "",
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

//function to hanlde when create btn is clicked
    onCreatePressed = async (e) => {
        e.preventDefault();

        await this.toogleLoadingAnimation(); //showing loading animation
        
    //verifying if entered data
        const enteredFirstName  = this.state.enteredFirstName.trim();
        const enteredSecondName = this.state.enteredSecondName.trim();
        const enteredPhoneNo    = this.state.enteredPhoneNo.trim();

        if( enteredFirstName != "" && enteredSecondName != "" && enteredPhoneNo != "" ) {
            if( !validateUsername( enteredFirstName ) ) {
                await this.makeSnackBar( "First Name cannot contain numbers, symbols and spaces", "error" );
                await this.toogleLoadingAnimation(); //hiding loading animation
                return;
            }

            if( !validateUsername( enteredSecondName ) ) {
                await this.makeSnackBar( "Second Name cannot contain numbers, symbols and spaces", "error" );
                await this.toogleLoadingAnimation(); //hiding loading animation
                return;
            }

            if( !validateContactNo( enteredPhoneNo ) ) {
                await this.makeSnackBar( "Contact number can only contain integer", "error" );
                await this.toogleLoadingAnimation(); //hiding loading animation
                return;
            }

            if( enteredPhoneNo.length != 10 ) {
                await this.makeSnackBar( "Phone number must be 10 digits long", "error" );
                await this.toogleLoadingAnimation(); //hiding loading animation
                return;  
            }
        
        //if everything is fine
            const response = await createUser( enteredFirstName, enteredSecondName, enteredPhoneNo );
            if( response == 1 ) {
                await this.makeSnackBar( "User created. You can book orders with your phone number now", "success" );
                // this.props.history.goBack();
            } else {
                await this.makeSnackBar( "This phone number is already taken", "error" );
            }
        } else {
            await this.makeSnackBar( "Please fill all details", "error" );
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
                        Create User
                    </h2>
                    <br />

                    <form onSubmit={ this.onCreatePressed }>
                        <label className="labelBox">
                            First Name
                            <br />
                            <div 
                                type="text"
                                required
                                className="inputBox inputBox2" 
                                // placeholder="first name" 
                                name="enteredFirstName" 
                                value={ this.state.enteredFirstName }
                                onChange={ this.onChange } />
                        </label>
                        <br /><br />

                        <label className="labelBox">
                            Last Name
                            <br />
                            <input 
                                type="text" 
                                required
                                className="inputBox inputBox2" 
                                // placeholder="second name" 
                                name="enteredSecondName" 
                                value={ this.state.enteredSecondName }
                                onChange={ this.onChange } />
                        </label>
                        <br /><br />
                        
                        <label className="labelBox">
                            Phone Number
                            <br />
                            <input 
                                type="number" 
                                required
                                className="inputBox inputBox2" 
                                // placeholder="phone nuber" 
                                name="enteredPhoneNo" 
                                value={ this.state.enteredPhoneNo }
                                onChange={ this.onChange } />
                        </label>
                        <br /><br />

                        <CircularButton text="Create" style={{ width: 180 }} onClick={ this.onCreatePressed }/>
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

export default UserBookOrder;