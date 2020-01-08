import React, { Component } from "react";

import data from '../json/HistoricTests.json';

class ViewTests extends Component {

	constructor(props) {
		super(props);
		this.onLoadTest = this.onLoadTest.bind(this);
	}

	onLoadTest() {

		var loadedData = require('../json/HistoricTests.json');

		var keys = Object.keys(loadedData);

		var allEmps = keys.map((t) => loadedData[t].map((e) => (e)));

		console.log(allEmps);

	}


	render() {
		return (
			<div>
				<div className="tableStyle">
					<table>
						<thead className="tableHeaderStyle">
							<tr>
								<th className="alignCenter">Proxy URL</th>
								<th className="alignCenter">User ID</th>
								<th className="alignCenter">Generated on</th>
								<th className="alignCenter fixedWidth">Executed Tests</th>
								<th className="alignCenter">Action</th>
							</tr>
						</thead>

						{
							data.Historic.map((test) => {
								return (

									<tr>
										<td>
											{test.proxyURL}
										</td>
										<td className="alignCenter">
											{test.userID}
										</td>
										<td className="alignCenter">
											{Intl.DateTimeFormat('en-US', {
												year: "numeric",
												month: "short",
												day: "2-digit",
												hour: "numeric",
												minute: "2-digit",
												second: "2-digit"
											}).format(test.timeStamp)}
										</td>
										<td className="alignCenter">

											<table>


												{test.globalOutput.map((global) => {
													return (
														<tr>
															<td>{global.key}</td>
														</tr>
													)

												})}



											</table>


										</td>

										<td className="alignCenter">
											<button className="btn btn-primary btn-sm add-element-button asvpButton" onClick={this.onLoadTest} id={test.id}>
												Load data
											</button>
										</td>
									</tr>

								);
							})
						}
					</table>
				</div>

			</div>
		);
	}
}

export default ViewTests;
