import React, { Component } from "react";

import Test from "./test";
import AddElementButton from "./addElementButton";
import GlobalTest from "./globalTest";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import InputText from "./inputText";

import "../App.css";

class AddNewTest extends Component {

	url = "http://localhost:8000";

	state = {
		pending: false,
		httpStatus: {
			error: false,
			code: "",
			message: "Server Response"
		},
		UserID: "",
		Timestamp: "",
		ProxyURL: "(org)-(env).apigee.net/(basepath)",
		tests: [
			{
				id: 0,
				metadata: {
					name: "Global",
					endpoint: "",
					method: ""
				},
				parameters: [],
				outputs: []
			},
			{
				id: 1,
				metadata: {
					name: "New Test",
					endpoint: "",
					method: ""
				},
				parameters: [
					{
						id: 1,
						type: "Query",
						key: "key",
						value: "value"
					}
				],
				outputs: [
					{
						id: 1,
						type: "Status Code",
						key: "Status Code",
						value: "200"
					}
				]
			}
		]
	};

	handleChangeType = (event, testId, elementId, type) => {
		this.setState(
			this.state.tests.map(test => {
				if (test.id === testId) {
					test[event.target.name].map(element => {
						if (element.id === elementId) {
							element.type = type;
						}
						return element;
					});
				}
				return test;
			})
		);
	};

	handleInputChange = (event, testId, elementType, elementId) => {
		this.clearValidationError();
		if (
			event.target.name !== "key" &&
			event.target.name !== "value" &&
			event.target.name !== "ProxyURL" &&
			event.target.name !== "endpoint"
		) {
			if (!this.validateInput(event.target.value)) {
				this.setValidationError(
					"Validation Error: Only alphanumeric characters are allowed"
				);
			}
		}
		if (elementType === "UserID") {
			this.setState({ UserID: event.target.value });
		} else if (elementType === "ProxyURL") {
			this.setState({ ProxyURL: event.target.value });
		} else {
			this.setState(
				this.state.tests.map(test => {
					if (test.id === testId) {
						// InputChange can refer to a subelement that requires ID (param/output) or one which does not require ID (metadata)
						if (elementType !== "metadata") {
							test[elementType].map(element => {
								if (element.id === elementId)
									element[event.target.name] = event.target.value;
								return element;
							});
						} else test[elementType][event.target.name] = event.target.value;
					}
					return test;
				})
			);
		}
	};

	validateInput = text => {
		return /^[a-zA-Z0-9\s]*$/.test(text);
	};

	setValidationError = message => {
		this.setState({
			validationError: {
				exist: true,
				message
			}
		});
	};

	clearValidationError = () => {
		this.setState({
			validationError: {
				exist: false,
				message: ""
			}
		});
	};

	getMaxId = function (array) {
		let max = 0;
		for (var element in array) {
			if (array[element].id > max) max = array[element].id;
		}
		return max;
	};

	handleAddTest = () => {
		const { tests } = this.state;

		const newTest = {
			id: this.getMaxId(tests) + 1,
			metadata: {
				name: "New Test",
				endpoint: "",
				method: ""
			},
			parameters: [
				{
					id: 1,
					type: "Query",
					key: "key",
					value: "value"
				}
			],
			outputs: [
				{
					id: 1,
					type: "Status Code",
					key: "Status Code",
					value: "200"
				}
			]
		};
		this.setState({ tests: [...this.state.tests, newTest] });
	};

	handleAddParameter = testId => {
		const { tests } = this.state;

		this.setState({
			tests: tests.map(test => {
				if (test.id === testId) {
					const newParam = {
						id: this.getMaxId(test.parameters) + 1,
						type: "Query",
						key: "key",
						value: "value"
					};

					test.parameters = [...test.parameters, newParam];
				}
				return test;
			})
		});
	};

	handleAddOutput = testId => {
		const { tests } = this.state;

		this.setState({
			tests: tests.map(test => {
				if (test.id === testId) {
					const newParam = {
						id: this.getMaxId(test.outputs) + 1,
						type: "Status Code",
						key: "Status Code",
						value: "200"
					};

					test.outputs = [...test.outputs, newParam];
				}
				return test;
			})
		});
	};

	handleRemoveElement = (event, testId, elementId) => {
		if (event.target.name === "test") {
			this.setState({
				tests: [...this.state.tests].filter(test => test.id !== testId)
			});
		} else {
			this.setState({
				tests: this.state.tests.map(test => {
					if (test.id === testId) {
						test[event.target.name] = test[event.target.name].filter(
							element => element.id !== elementId
						);
					}
					return test;
				})
			});
		}
	};


	render() {

		return (
			<div>

				<div className="main-content">

					<div className="main-header">ensure your proxies are protected</div>
					<div className="general-config-div">
						<div>
							{"ProxyURL: "}
							<InputText
								type="text"
								autocomplete="off"
								targetElement="ProxyURL"
								targetAttribute="ProxyURL"
								placeholder={this.state.ProxyURL}
								onChange={this.handleInputChange}
							/>
							{" UserID: "}
							<InputText
								type="text"
								autocomplete="off"
								className="input-text-UserID"
								targetElement="UserID"
								placeholder={this.state.UserID}
								onChange={this.handleInputChange}
							/>
						</div>
					</div>
					<div className="global-test-div">
						<h1
							style={{ textAlign: "right", height: "0", paddingRight: "10px" }}
						>
							Global
            </h1>
						<GlobalTest
							key="0"
							test={this.state.tests.filter(test => test.id === 0)[0]}
							onRemoveElement={this.handleRemoveElement}
							onInputChange={this.handleInputChange}
							onAddParameterElement={this.handleAddParameter}
							onAddOutputElement={this.handleAddOutput}
							onChangeType={this.handleChangeType}
						/>
					</div>
					<div className="test-div">
						<h1
							style={{ textAlign: "right", height: "0", paddingRight: "10px" }}
						>
							Tests
            </h1>
						<TransitionGroup>
							{this.state.tests
								.filter(test => test.id !== 0)
								.map(test => (
									<CSSTransition timeout={500} classNames="test" key={test.id}>
										<Test
											key={test.id}
											test={test}
											onRemoveElement={this.handleRemoveElement}
											onInputChange={this.handleInputChange}
											onAddParameterElement={this.handleAddParameter}
											onAddOutputElement={this.handleAddOutput}
											onChangeType={this.handleChangeType}
										/>
									</CSSTransition>
								))}
						</TransitionGroup>
					</div>
					<AddElementButton
						type="add-element-button-Test"
						onAddElement={this.handleAddTest}
						label="Test"
						testId={null}
					/>

				</div>
			</div>
		);
	}
}

export default AddNewTest;