import React, { Component } from "react";
import RemoveElementButton from "./removeElementButton";
import AddElementButton from "./addElementButton";
import InputText from "./inputText";
import Parameter from "./parameter/parameter";
import ExpectedOutput from "./expectedOutput";
import Modal from "./modal";
import "../App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  toggleModal = () => {
    this.setState({ show: !this.state.show });
  };

  generateLeftSideData(test) {

    return (
      <div className="leftSideTestData">

        <RemoveElementButton
          type="remove-element-button-Test"
          label={"Test"}
          onRemoveElement={this.toggleModal}
          elementId={test.id}
          elementType="test"
        />

      </div>
    );
  }

  modalWarning(test) {

    return (
      <Modal
        test={test}
        show={this.state.show}
        toggleModal={this.toggleModal}
        onRemoveElement={this.props.onRemoveElement}
      >
        <h2>Are you sure you want to delete {test.metadata.name}?</h2>
      </Modal>

    );
  }

  render() {
    const { test, loadedTests } = this.props;

    if (loadedTests.newUserID !== "") {

      /* const dataParameters = Array.from(loadedTests.newTests1[0]["Verify Valid API Key"].Parameters);
      const dataExpectedOutput = Array.from(loadedTests.newTests1[0]["Verify Valid API Key"].ExpectedOutput);

      console.log(dataParameters);
      console.log(dataExpectedOutput); */

      return (

        <div className="test">

          {Object.keys(loadedTests.newTests1).map((key, i) => (


            <div>

              {this.generateLeftSideData(key)}

              <div className="rightSideTestData">

                <fieldset className="fieldsetStyle adjustedPlaceHolder">
                  <legend> {" Test Name "} </legend>

                  <InputText
                    className="input-text-Name"
                    placeholder="New Test"
                    autocomplete="off"
                    defaultValue={loadedTests.newTests1[0]}
                    targetAttribute="name"
                    elementId={key.id}
                    onChange={this.props.onInputChange}
                    testId={key.id}
                    targetElement="metadata"
                  />

                </fieldset>

                <fieldset className="fieldsetStyle adjustedPlaceHolder">
                  <legend> {" Endpoint "} </legend>
                  <InputText
                    placeholder="/url"
                    autocomplete="off"
                    /* defaultValue={loadedTests.newTests1[i]["Verify Valid API Key"].Endpoint} */
                    targetAttribute="endpoint"
                    elementId={key.id}
                    onChange={this.props.onInputChange}
                    testId={key.id}
                    targetElement="metadata"
                  />
                </fieldset>

                <fieldset className="fieldsetStyle adjustedPlaceHolder">
                  <legend> {" Method "} </legend>
                  <InputText
                    placeholder="GET"
                    autocomplete="off"
/*                     defaultValue={loadedTests.newTests1[i]["Verify Valid API Key"].Method}
 */                    targetAttribute="method"
                    elementId={key.id}
                    onChange={this.props.onInputChange}
                    testId={key.id}
                    targetElement="metadata"
                  />
                </fieldset>

                <fieldset className="fieldsetStyle maxPlaceHolder">
                  <legend> {" Parameters "} </legend>
                  <div className="test-element-div">
                    <ul>
                      <TransitionGroup>
                        {test.parameters.map(param => (
                          <CSSTransition
                            timeout={500}
                            classNames="test-element"
                            key={param.id}
                          >
                            <li key={param.id}>
                              <Parameter
                                key={param.id}
                                testId={test.id}
                                onRemoveElement={this.props.onRemoveElement}
                                onChangeType={this.props.onChangeType}
                                param={param}
                                onInputChange={this.props.onInputChange}
                              />
                            </li>
                          </CSSTransition>
                        ))}
                      </TransitionGroup>
                    </ul>
                    <AddElementButton
                      testId={key.id}
                      label="Parameter"
                      onAddElement={this.props.onAddParameterElement}
                    />
                  </div>

                  <div className="test-element-div">
                    <ul>
                      <TransitionGroup>
                        {test.outputs.map(output => (
                          <CSSTransition
                            timeout={500}
                            classNames="test-element"
                            key={output.id}
                          >
                            <li key={output.id}>
                              <ExpectedOutput
                                key={output.id}
                                testId={key.id}
                                onRemoveElement={this.props.onRemoveElement}
                                onChangeType={this.props.onChangeType}
                                output={output}
                                onInputChange={this.props.onInputChange}
                              />
                            </li>
                          </CSSTransition>
                        ))}
                      </TransitionGroup>
                    </ul>
                    <AddElementButton
                      testId={key.id}
                      label="Output"
                      onAddElement={this.props.onAddOutputElement}
                    />
                  </div>
                </fieldset>
              </div>
            </div>
          ))}

          {this.modalWarning(test)}

        </div>
      );
    }
    else {

      return (

        <div className="test">

          {this.generateLeftSideData(test)}

          <div className="rightSideTestData">

            <fieldset className="fieldsetStyle adjustedPlaceHolder">
              <legend> {" Test Name "} </legend>

              <InputText
                className="input-text-Name"
                placeholder="New Test"
                autocomplete="off"
                defaultValue={loadedTests.newTests1[0]}
                targetAttribute="name"
                elementId={test.id}
                onChange={this.props.onInputChange}
                testId={test.id}
                targetElement="metadata"
              />

            </fieldset>

            <fieldset className="fieldsetStyle adjustedPlaceHolder">
              <legend> {" Endpoint "} </legend>
              <InputText
                placeholder="/url"
                autocomplete="off"
                targetAttribute="endpoint"
                elementId={test.id}
                onChange={this.props.onInputChange}
                testId={test.id}
                targetElement="metadata"
              />
            </fieldset>

            <fieldset className="fieldsetStyle adjustedPlaceHolder">
              <legend> {" Method "} </legend>
              <InputText
                placeholder="GET"
                autocomplete="off"
                targetAttribute="method"
                elementId={test.id}
                onChange={this.props.onInputChange}
                testId={test.id}
                targetElement="metadata"
              />
            </fieldset>

            <fieldset className="fieldsetStyle maxPlaceHolder">
              <legend> {" Parameters "} </legend>
              <div className="test-element-div">
                <ul>
                  <TransitionGroup>
                    {test.parameters.map(param => (
                      <CSSTransition
                        timeout={500}
                        classNames="test-element"
                        key={param.id}
                      >
                        <li key={param.id}>
                          <Parameter
                            key={param.id}
                            testId={test.id}
                            onRemoveElement={this.props.onRemoveElement}
                            onChangeType={this.props.onChangeType}
                            param={param}
                            onInputChange={this.props.onInputChange}
                          />
                        </li>
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                </ul>
                <AddElementButton
                  testId={test.id}
                  label="Parameter"
                  onAddElement={this.props.onAddParameterElement}
                />
              </div>

              <div className="test-element-div">
                <ul>
                  <TransitionGroup>
                    {test.outputs.map(output => (
                      <CSSTransition
                        timeout={500}
                        classNames="test-element"
                        key={output.id}
                      >
                        <li key={output.id}>
                          <ExpectedOutput
                            key={output.id}
                            testId={test.id}
                            onRemoveElement={this.props.onRemoveElement}
                            onChangeType={this.props.onChangeType}
                            output={output}
                            onInputChange={this.props.onInputChange}
                          />
                        </li>
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                </ul>
                <AddElementButton
                  testId={test.id}
                  label="Output"
                  onAddElement={this.props.onAddOutputElement}
                />
              </div>
            </fieldset>
          </div>

          {this.modalWarning(test)}

        </div>
      );
    }
  }
}
export default Test;
