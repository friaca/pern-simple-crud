import React from "react";
import "./Button.css";

function Button(props) {
  return (
    <div style={props.style} className="button-container">
      <button onClick={() => (props.action ? props.action() : null)}>
        {props.children}
      </button>
    </div>
  );
}

export default Button;
