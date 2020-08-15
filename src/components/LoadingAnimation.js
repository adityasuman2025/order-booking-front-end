import React, {Component} from 'react';

class LoadingAnimation extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            this.props.loading ?
                <center>
                    <img alt="loading" className="loadingAnimation" src={ require("../img/loaders2.gif") } />	
                </center>
            : null
        );
    }
}
  
export default LoadingAnimation;