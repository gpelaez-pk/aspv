import React, { Component } from "react";
import InputText from "./inputText";

import Collapsible from 'react-collapsible';


class ViewTests extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			text: "Load test",
			filteredList: [],
			message: false
		};
		this.filterTestsByUserID = this.filterTestsByUserID.bind(this);
		this.filterTestsByName = this.filterTestsByName.bind(this);

		this.generateData = this.generateData.bind(this);
	}

	componentDidMount() {
		this.props.loadTests();
		setTimeout(() => {
			this.setState({
				filteredList: this.props.allTestsList
			})
		}, 80);
	}

	filterTestsByName(e) {

		this.updatedList = this.props.allTestsList;

		this.updatedList = this.updatedList.filter((item => {


			var allPropertyNames = Object.keys(item.tests);
			for (var j = 0; j < allPropertyNames.length; j++) {
				var name = allPropertyNames[j];
			}

			return name.toLowerCase().search(
				e.target.value.toLowerCase()) !== -1;

		}));

		this.configureData(this.updatedList);
	}

	filterTestsByUserID(e) {

		this.updatedList1 = this.props.allTestsList;

		this.updatedList1 = this.updatedList1.filter((item => {

			return item.userID.toLowerCase().search(
				e.target.value.toLowerCase()) !== -1;
		}));

		this.configureData(this.updatedList1);
	}

	configureData(updatedList) {
		this.setState({
			filteredList: updatedList,
		});

		if (updatedList.length === 0) {
			this.setState({
				message: true,
			});
		} else {
			this.setState({
				message: false,
			});
		}
	}

	saveDataMethod(test) {
		this.props.sendData(test);
	}

	generateData(data) {

		console.log(data);
		const generateElement = (key, value) => {
			if (value !== "") {
				return (
					<tr key={key}>
						<td className="smallTableWidthKey">{key}</td>
						<td>{value}</td>
					</tr>
				);
			}
		}

		const generateKeyheader = (key) => {
			return (
				<tr key={key}>
					<td colSpan="2" className="centeredTitle">&#60;&#60;&#60; {key} &gt;&gt;&gt;</td>
				</tr>
			);
		}

		const newData = Object.keys(data).reduce((result, currentKey) => {

			if (typeof data[currentKey] === 'string' || data[currentKey] instanceof String) {

				const elementToPush = generateElement(currentKey, data[currentKey]);

				if ((currentKey !== 'timeStamp')) {
					if ((currentKey !== 'userID')) {
						if ((currentKey !== 'ProxyURL')) {
							result.push(elementToPush);
						}
					}
				}

			} else {

				if ((currentKey !== "Parameters") && (currentKey !== "QueryParams") && (currentKey !== "ExpectedOutput")) {
					const testName = generateKeyheader(currentKey);
					result.push(testName);
				}

				const nested = this.generateData(data[currentKey]);
				result.push(nested);
			}
			return result;
		}, []);
		return newData;
	}

	render() {

		return (
			<div className="tableStyle">
				<fieldset className="fieldsetStyle search-field byUser">
					<legend> {" Search by User ID"} </legend>
					<InputText
						type="text"
						autocomplete="off"
						className="input-text-UserID"
						placeholder="Enter user..."
						onChange={this.filterTestsByUserID}
					/>
				</fieldset>
				<fieldset className="fieldsetStyle search-field byTestName">
					<legend> {"Search by Test Name"} </legend>
					<InputText
						type="text"
						autocomplete="off"
						className="input-text-UserID"
						placeholder="Enter test name..."
						onChange={this.filterTestsByName}
					/>
				</fieldset>

				<table>
					<thead className="tableHeaderStyle">
						<tr>
							<th className="alignCenter min-proxyurl-required">Proxy URL</th>
							<th className="alignCenter min-user-required">User ID</th>
							<th className="alignCenter min-timestamp-required">Generated on</th>
							<th className="alignCenter fixedWidth">Details</th>
							<th className="alignCenter min-action-required">Action</th>
						</tr>
					</thead>
					<tbody>

						{this.state.message ? <tr><td colSpan="5">No search results.</td></tr> : ''}

						{this.state.filteredList.map((item) => {
							return (
								<tr key={item.id}>
									<td>
										{item.global.ProxyURL}
									</td>
									<td className="alignCenter">
										{item.userID}
									</td>
									<td className="alignCenter">
										{Intl.DateTimeFormat('en-US', {
											year: "numeric",
											month: "short",
											day: "2-digit",
											hour: "numeric",
											minute: "2-digit",
											second: "2-digit"
										}).format(item.timeStamp)}
									</td>
									<td className="alignCenter">
										<Collapsible trigger="See all Details">
											<table>
												<tbody>
													{this.generateData(item.tests)}
												</tbody>
											</table>
										</Collapsible>
									</td>

									<td className="alignCenter">
										<button
											className="btn btn-primary btn-sm add-element-button asvpButton"
											onClick={() => {
												this.saveDataMethod(item);
											}}
										>
											{this.state.text}
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ViewTests;
