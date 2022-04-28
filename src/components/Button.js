import React from "react";
import "./Button.scss";
import classNames from "classnames";

// Returns buttons view
const Button = (props) => {
   const buttonClass = classNames('button', { "button--confirm": props.confirm,  "button--danger": props.danger }); 
   return (
      <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>
        {props.children}
      </button>
    );
  }

  export default Button;