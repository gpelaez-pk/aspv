import React, { Component } from "react";

import data from '../json/HistoricTests.json';

class ViewTests extends Component {


	state = { text: "Load data" };

	saveDataMethod(test) {
		this.props.sendData(test);
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
						<tbody>
							{
								data.Historic.map((test) => {
									return (

										<tr key={test.id}>
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

													<tbody>
														{test.tests.map((global) => {
															return (
																<tr key={global.key}>
																	<td>{global.testName}</td>
																</tr>
															)

														})}

													</tbody>

												</table>


											</td>

											<td className="alignCenter">
												<button
													className="btn btn-primary btn-sm add-element-button asvpButton"
													onClick={() => {
														this.saveDataMethod(test);

													}}
												>
													{this.state.text}
												</button>
											</td>
										</tr>
									);
								})
							}
						</tbody>
					</table>
				</div>

			</div>
		);
	}
}

export default ViewTests;
