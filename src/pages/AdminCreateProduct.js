import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import AdminNavBar from "../components/AdminNabBar";
import CircularButton from "../components/CircularButton";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";
import SuccesMsg from "../components/SuccesMsg";

import { getDecryptedCookieValue, createProduct } from "../helperFunctions";

class AdminCreateProduct extends Component {
    constructor(){
	    super();

	    this.state = {
            loading: true,

			snackBarVisible: false,
			snackBarMsg: "",
            snackBarType: "success",

            redirectToAdminHome: false,

            formVisible: true,

            enteredProductName: "",
            enteredProductDesc: "",
            enteredProductPrice: "",
        }
    }

    componentDidMount = async () => {
    //checking if admin is logged or not
        const isAdminLogged = await getDecryptedCookieValue( "order_booking_admin_logged" );
        if( isAdminLogged != 1 ) {
        //if admin is not logged then redirecting to admin home page
            this.setState({
                redirectToAdminHome: true,
            });

            return;
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

//function to hanlde when create btn is clicked
    onCreatePressed = async (e) => {
        e.preventDefault();

        await this.toogleLoadingAnimation(); //showing loading animation
        
    //verifying if entered data
        const enteredProductName    = this.state.enteredProductName.trim();
        const enteredProductDesc    = this.state.enteredProductDesc.trim();
        const enteredProductPrice   = this.state.enteredProductPrice.trim();

        if( enteredProductName != "" && enteredProductDesc != "" && enteredProductPrice != "" ) {
        //if everything is fine
            const response = await createProduct( enteredProductName, enteredProductDesc, enteredProductPrice );
            if( response == 1 ) {
            //hiding form and displaying success msg
                await this.setState({
                    formVisible: false,
                });

                await this.makeSnackBar( "Product successfully created.", "success" );
            } else {
                await this.makeSnackBar( "Something went wrong", "error" );
            }
        } else {
            await this.makeSnackBar( "Please fill all details", "error" );
        }

        await this.toogleLoadingAnimation(); //hiding loading animation
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
                <AdminNavBar active="create_product" />
                <br/><br/><br/>

                <div className="pageContent center">
                    <br /><br />
                    <h2>
                        Create Product
                    </h2>
                    <br />

                    {
                        this.state.formVisible ? 
                            <form onSubmit={ this.onCreatePressed }>
                            <label className="labelBox">
                                Name
                                <br />
                                <input 
                                    type="text"
                                    required
                                    className="inputBox inputBox2" 
                                    // placeholder="first name" 
                                    name="enteredProductName" 
                                    value={ this.state.enteredProductName }
                                    onChange={ this.onChange } />
                            </label>
                            <br /><br />

                            <label className="labelBox">
                                Description
                                <br />
                                <textarea
                                    required
                                    className="inputBox inputBox2" 
                                    // placeholder="second name" 
                                    name="enteredProductDesc" 
                                    value={ this.state.enteredProductDesc }
                                    onChange={ this.onChange } />
                            </label>
                            <br /><br />
                            
                            <label className="labelBox">
                                Price (in Rupees)
                                <br />
                                <input 
                                    type="number" 
                                    required
                                    className="inputBox inputBox2" 
                                    // placeholder="phone nuber" 
                                    name="enteredProductPrice" 
                                    value={ this.state.enteredProductPrice }
                                    onChange={ this.onChange } />
                            </label>
                            <br /><br />

                            <CircularButton text="Create" style={{ width: 180 }} onClick={ this.onCreatePressed }/>
                        </form>
                        : 
                            <SuccesMsg 
                                successMsg="Product successfully created" 
                                redirectToName="Create Another"
                                redirectToUrl="reload"
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

export default AdminCreateProduct;