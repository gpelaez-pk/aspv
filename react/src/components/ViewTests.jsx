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
		this.filterTestsByProxyURL = this.filterTestsByProxyURL.bind(this);
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

	filterTestsByProxyURL(e) {

		var updatedList = this.props.allTestsList;

		updatedList = updatedList.filter((item => {

			/* var allPropertyNames = Object.keys(item.tests);
			for (var j = 0; j < allPropertyNames.length; j++) {
				var name = allPropertyNames[j];
				console.log(name);
				return name.toLowerCase().search(
					e.target.value.toLowerCase()) !== -1;
			} */


			return item.global.ProxyURL.toLowerCase().search(
				e.target.value.toLowerCase()) !== -1;
		}));

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
		const generateElement = (key, value) => {
			return (
				<tr key={key}>
					<td className="smallTableWidthKey">{key}</td>
					<td>{value}</td>
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
				const nested = this.generateData(data[currentKey]);
				result.push(...nested);
			}
			return result;
		}, []);
		return newData;
	}

	render() {

		return (
			<div className="tableStyle">
				<fieldset className="fieldsetStyle search-field">
					<legend> {"Filter"} </legend>
					<InputText
						type="text"
						autocomplete="off"
						className="input-text-UserID"
						placeholder="Search Text"
						onChange={this.filterTestsByProxyURL}
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
													{this.generateData(item)}
													{this.state.message ? <li>No search results.</li> : ''}
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
