import React from "react";
import classNames from "classnames";

// Stylesheet
import "components/Button.scss";

// Component
export default function Button(props) {
  const buttonClass = classNames("button", {
    " button--confirm": props.confirm,
    " button--danger": props.danger
  });
 
  return (
    <button 
      disabled={props.disabled || false} 
      onClick={props.onClick} 
      className={buttonClass}
    >
      {props.children}
    </button>
  );
}


