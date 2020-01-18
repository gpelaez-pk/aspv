import React, { Component } from "react";
import Collapsible from 'react-collapsible';
import axios from 'axios';

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
		this.fetchTests();
	}

	async fetchTests() {
		const response = await axios.get("../json/HistoricTests.json");
		try {
			this.setState({
				loadedInfo: response.data.details,
				isLoading: false
			});
		} catch (error) {
			this.setState({ error, isLoading: false });
		}
	}

	saveDataMethod(test) {
		this.props.sendData(test);
	}

	render() {
		const { isLoading, loadedInfo } = this.state;

		const generateElement = (key, value) => {
			return (
				<tr key={key}>
					<td>{key}</td>
					<td>{value}</td>
				</tr>
			);
		}

		function generateData(data) {
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
					const nested = generateData(data[currentKey]);
					result.push(...nested);
				}
				return result;
			}, []);
			return newData;
		}

		return (
			<div>
				<div className="tableStyle">
					<table>
						<thead className="tableHeaderStyle">
							<tr>
								<th className="alignCenter">Proxy URL</th>
								<th className="alignCenter min-user-required">User ID</th>
								<th className="alignCenter min-timestamp-required">Generated on</th>
								<th className="alignCenter fixedWidth">Details</th>
								<th className="alignCenter min-action-required">Action</th>
							</tr>
						</thead>
						<tbody>

							{!isLoading ? (
								loadedInfo.map(item => {

									const { id, userID, timeStamp } = item;
									const { ProxyURL } = item.global;

									return (
										<tr key={id}>
											<td>
												{ProxyURL}
											</td>
											<td className="alignCenter">
												{userID}
											</td>
											<td className="alignCenter">
												{Intl.DateTimeFormat('en-US', {
													year: "numeric",
													month: "short",
													day: "2-digit",
													hour: "numeric",
													minute: "2-digit",
													second: "2-digit"
												}).format(timeStamp)}
											</td>
											<td className="alignCenter">
												<Collapsible trigger="See all Details">
													<table>
														<tbody>
															{generateData(item)}
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
								})
							) : (
									<tr>
										<td>
											<p>Loading Historic Data...</p>
										</td>
									</tr>

								)}
						</tbody>
					</table>
				</div>
			</div>
		);


	}
}

export default ViewTests;
