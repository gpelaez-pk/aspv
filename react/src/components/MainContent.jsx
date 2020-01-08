import React, { Component } from "react";

import AddNewTest from "./addNewTest";
import Sidebar from "./sidebar";
import ViewTests from "./ViewTests";



class MainContent extends Component {

	state = {

		pending: false,

		validationError: {
			exist: false,
			message: ""
		},

		httpStatus: {
			error: false,
			code: "",
			message: "Server Response"
		}
	}


	render() {

		return (
			<div>

				<Sidebar
					validationError={this.state.validationError}
					pending={this.state.pending}
					httpStatus={this.state.httpStatus}
					onHttpGetRequest={this.handleHttpGetRequest}
					onSubmitRequest={this.handleSubmitRequest}
				/>
				<ViewTests />
				<AddNewTest />

			</div>
		);
	}
}

export default MainContent;