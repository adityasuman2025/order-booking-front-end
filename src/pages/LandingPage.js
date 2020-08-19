import React from 'react';

import CircularButton from "../components/CircularButton";
import { project_name } from "../constants";

function LandingPage(props) {
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

				<CircularButton text="User" onClick={ () => { props.history.push( '/user' ) } } />
				<br/>
				<CircularButton text="Admin" onClick={ () => { props.history.push( '/admin' ) } } />
			</div>
		</div>
	)
}

export default LandingPage;