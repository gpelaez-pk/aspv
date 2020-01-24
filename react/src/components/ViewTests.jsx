import React, { Component } from "react";
import Collapsible from 'react-collapsible';

class ViewTests extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			loadedInfo: [],
			text: "Load test"
		};
	}

	componentDidMount() {
		this.props.loadTests();
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

						{this.props.allTestsList.map((cat) => (

							<tr key={cat.id}>
								<td>
									{cat.global.ProxyURL}
								</td>
								<td className="alignCenter">
									{cat.userID}
								</td>
								<td className="alignCenter">
									{Intl.DateTimeFormat('en-US', {
										year: "numeric",
										month: "short",
										day: "2-digit",
										hour: "numeric",
										minute: "2-digit",
										second: "2-digit"
									}).format(cat.timeStamp)}
								</td>
								<td className="alignCenter">
									<Collapsible trigger="See all Details">
										<table>
											<tbody>
												{this.generateData(cat)}
											</tbody>
										</table>
									</Collapsible>
								</td>

								<td className="alignCenter">
									<button
										className="btn btn-primary btn-sm add-element-button asvpButton"
										onClick={() => {
											this.saveDataMethod(cat);
										}}
									>
										{this.state.text}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ViewTests;
