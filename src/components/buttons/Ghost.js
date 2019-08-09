import React, { Component } from 'react';

class GhostButton extends Component {
  render() {
    var ghostButtonVariant = "GhostButton GhostButton--" + this.props.variant

    return (
      <button className={ghostButtonVariant} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default GhostButton;