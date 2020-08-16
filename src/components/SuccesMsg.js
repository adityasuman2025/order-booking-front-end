import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class SuccesMsg extends Component {
    constructor(){
        super();

        this.state = {
            redirect: false,
        }
    }

//on clicking on any redirect button
    redirectToUrl = () => {
        if( this.props.redirectToName && this.props.redirectToUrl ) {
            this.setState({
                redirect: true,
            });
        }
    }

//rendering
    render() {
    //redirecting to admin home page
        if( this.state.redirect ) {
            return (<Redirect to={ this.props.redirectToUrl }/>)
        }
        
    //rendering
        return (
            <div>
                <img className="successImg" src={ require("../img/tick.png") } />
                <br /><br />
                <div className="successText">{ this.props.successMsg }</div>
                <br />

                {
                    this.props.redirectToName ? 
                        <button 
                            className="btn coloredTextBtn"
                            onClick={ this.redirectToUrl }
                        >
                            { this.props.redirectToName }
                        </button>
                    : null
                }
            </div>
        );
    }
}
  
export default SuccesMsg;