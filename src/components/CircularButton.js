import React from 'react';
import classNames from 'classnames';

function CircularButton(props) {
	return (
		<button onClick={ props.onClick } className={ classNames( 'circularBtnContainer', props.className ) }  >
			{ props.text }
		</button>
	)
}

export default CircularButton;