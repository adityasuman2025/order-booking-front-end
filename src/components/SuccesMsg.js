import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function SuccesMsg(props) {
    const [ redirect, setRedirect ] = useState( false );

//on clicking on any redirect button
    const redirectToUrl = () => {
        if( props.redirectToName && props.redirectToUrl ) {
            if( props.redirectToUrl == "reload" ) {
                window.location.reload();
            } else {
                setRedirect( true );
            }
        }
    }

//redirecting to admin home page
    if( redirect ) {
        return (<Redirect to={ props.redirectToUrl }/>)
    }
        
//rendering
    return (
        <div>
            <img className="successImg" src={ require("../img/tick.png") } />
            <br /><br />
            <div className="successText">{ props.successMsg }</div>
            <br />

            {
                props.redirectToName ? 
                    <button 
                        className="btn coloredTextBtn"
                        onClick={ redirectToUrl }
                    >
                        { props.redirectToName }
                    </button>
                : null
            }
        </div>
    )
}
  
export default SuccesMsg;