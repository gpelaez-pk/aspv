import React, { Component } from "react";
import ParameterDropdown from "./parameterDropdown";
import RemoveElementButton from "../removeElementButton";
import InputText from "../inputText";
import "../../App.css";

class Parameter extends Component {



  render() {


    const {
      param,
      testId,
      onInputChange,
      onChangeType,
      onRemoveElement,
      loadedParamTests
    } = this.props;


    return (

      <div className="test-element">
        <RemoveElementButton
          label=""
          testId={testId}
          elementId={param.id}
          onRemoveElement={onRemoveElement}
          elementType="parameters"
        />
        <ParameterDropdown
          param={param}
          testId={testId}
          onChangeType={onChangeType}
        />

        <InputText
          className="input-fix-small"
          autocomplete="off"
          placeholder={param.type === "Body" ? "N/A" : param.key}
          disabled={param.type === "Body" ? "disabled" : undefined}
          onChange={onInputChange}
          defaultValue={JSON.stringify(loadedParamTests)}
          elementId={param.id}
          targetAttribute="key"
          testId={testId}
          targetElement="parameters"
        />
        =
      <InputText
          className="input-fix-big"
          autocomplete="off"
          placeholder={param.value}
          onChange={onInputChange}
          password={param.type === "BasicAuth" ? true : undefined}
          elementId={param.id}
          testId={testId}
          targetAttribute="value"
          targetElement="parameters"
        />

      </div>
    );
  }
}

export default Parameter;
