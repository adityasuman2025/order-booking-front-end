import React, { Component } from 'react';

import CircularButton from "../components/CircularButton";
import { project_name } from "../constants";

class LandingPage extends Component {
	constructor(){
	    super();
	   
	    this.state = {
	    };
  	}

  	componentDidMount() {
	}

//rendering
	render() {
	//rendering
		return (
			<div className="horiVertCenter">
				<div className="choiceBox">
					<img className="logoImg" alt="logo image" src={ require("../img/logo.png") } />
					<br/><br/>
					<div className="projectTitleText">
						{ project_name }
					</div>
					<br/><br/><br/>

					<CircularButton text="User" onClick={ () => { this.props.history.push( '/user' ) } } />
					<br/>
					<CircularButton text="Admin" onClick={ () => { this.props.history.push( '/admin' ) } } />
				</div>
			</div>
		);
	}
}

export default LandingPage;