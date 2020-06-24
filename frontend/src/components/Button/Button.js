import React, { Component } from "react";
import "./Button.css";

class Button extends Component {
  render() {
    return (
      <div style={this.props.style} className="button-container">
        <button onClick={() => this.props.action()}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default Button;
