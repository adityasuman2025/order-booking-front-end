import React, {Component} from 'react';

class CircularButton extends Component {
  render() {
    return (
		<div onClick={ this.props.onClick } className="circularBtnContainer" style={ this.props.style } >
			{ this.props.text }
		</div>
    );
  }
}

export default CircularButton;