import React, {Component} from 'react';

class CircularButton extends Component {
  render() {
    return (
      <button onClick={ this.props.onClick } className="circularBtnContainer" style={ this.props.style } >
        { this.props.text }
      </button>
    );
  }
}

export default CircularButton;