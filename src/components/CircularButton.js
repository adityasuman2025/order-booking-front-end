import React, {Component} from 'react';
import classNames from 'classnames';

class CircularButton extends Component {
  render() {
    return (
      <button onClick={ this.props.onClick } className={ classNames( 'circularBtnContainer', this.props.className ) } >
        { this.props.text }
      </button>
    );
  }
}

export default CircularButton;