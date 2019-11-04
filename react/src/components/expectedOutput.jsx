import React, { Component } from "react";
import RemoveElementButton from "./removeElementButton";
import ExpectedOutputDropdown from "./expectedOutputDropdown";
import InputText from "./inputText";

class ExpectedOutput extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <RemoveElementButton
            label="Output"
            onRemoveElement={this.props.onRemoveElement}
            elementId={this.props.output.id}
          />
          <ExpectedOutputDropdown
            output={this.props.output}
            onChangeType={this.props.onChangeType}
          />
          <InputText
            placeholder={
              this.props.output.type === "Status Code"
                ? "Status code"
                : this.props.output.key
            }
            disabled={
              this.props.output.type === "Status Code" ? "disabled" : undefined
            }
            onChange={this.props.onInputChange}
            elementId={this.props.output.id}
            targetAttribute="key"
          />
          =
          <InputText placeholder={this.props.output.value} onChange={this.props.onInputChange} elementId={this.props.output.id} targetAttribute="value"/>
        </div>
      </div>
    );
  }
}

export default ExpectedOutput;
