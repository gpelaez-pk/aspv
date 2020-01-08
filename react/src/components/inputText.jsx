import React, { Component } from "react";
import "../App.css";

class InputText extends Component {
  render() {
    const {
      placeholder,
      disabled,
      autocomplete,
      testId,
      elementId,
      targetAttribute,
      targetElement,
      onChange
    } = this.props;

    return (
      <input
        className={this.props.className || "input-text"}
        type={this.props.password === true ? "password" : "text"}
        placeholder={placeholder}
        defaultValue={this.props.defaultValue || ''}
        disabled={disabled}
        autoComplete={autocomplete}
        onChange={event => {
          onChange(event, testId, targetElement, elementId);
        }}
        name={targetAttribute}
      />
    );
  }
}

export default InputText;
