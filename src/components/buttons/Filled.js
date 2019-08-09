import React, { Component } from 'react';

class FilledButton extends Component {
  render() {
    var filledButtonVariant = "FilledButton FilledButton--" + this.props.variant

    return (
      <button className={filledButtonVariant} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default FilledButton;