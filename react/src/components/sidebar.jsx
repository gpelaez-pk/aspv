import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import ServerResponse from "./serverResponse";
import ApigeeShield from "../img/apigee-shield.png";
import Spinner from "react-bootstrap/Spinner";
import ErrorPanel from "./errorPanel";


function handleSocialExit() {
  // remove
  localStorage.removeItem('access');
  // remove all
  localStorage.clear();
  window.location.reload();
}



class Sidebar extends Component {

  url = "http://localhost:8000";

  state = {

    UserID: "",
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

  scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Sidebar Functions

  handleHttpGetRequest = endpoint => {
    this.setPendingServerResponse();
    axios
      .get(`${this.url}/${endpoint}?id=${this.state.UserID}`)
      .then(res => {
        console.log(res);
        this.handleServerResponseChange(
          `${res.status} ${res.statusText}`,
          `${res.data.message ? res.data.message : "Success"}`,
          false
        );
      })
      .catch(err => {
        if (!err.status)
          this.handleServerResponseChange(
            500,
            "The server appears to be down",
            true
          );
        if (err.response)
          this.handleServerResponseChange(
            err.response.status,
            err.response.data.Error,
            true
          );
      });
  };


  handleSubmitRequest = () => {
    this.setPendingServerResponse();
    const { tests } = this.state;
    let req = { global: { ProxyURL: this.state.ProxyURL }, tests: {} };
    for (var test in tests) {
      const params = this.parseParameters(tests[test]);
      for (var param in params)
        if (Object.entries(params[param]).length === 0) delete params[param];
      const outputs = this.parseOutputs(tests[test]);
      for (var output in outputs)
        if (Object.entries(outputs[output]).length === 0)
          delete outputs[output];
      if (tests[test].id === 0) {
        req.global = {
          ProxyURL: this.state.ProxyURL,
          Endpoint: tests[test].metadata.endpoint,
          Method: tests[test].metadata.method,
          Parameters: params,
          ExpectedOutput: outputs
        };
        if (Object.entries(req.global.Parameters).length === 0)
          delete req.global.Parameters;
        if (Object.entries(req.global.ExpectedOutput).length === 0)
          delete req.global.ExpectedOutput;
      } else {
        req.tests[tests[test].metadata.name] = {
          Endpoint: tests[test].metadata.endpoint,
          Method: tests[test].metadata.method,
          Parameters: params,
          ExpectedOutput: outputs
        };
        if (
          Object.entries(req.tests[tests[test].metadata.name].Parameters)
            .length === 0
        )
          delete req.tests[tests[test].metadata.name].Parameters;
        if (
          Object.entries(req.tests[tests[test].metadata.name].ExpectedOutput)
            .length === 0
        )
          delete req.tests[tests[test].metadata.name].ExpectedOutput;
      }
    }
    console.log(req);
    axios
      .post(`${this.url}/generate?id=${this.state.UserID}`, req)
      .then(res => {
        console.log(res);
        this.handleServerResponseChange(
          res.status,
          `Tests generated.\nUserID: ${res.data.id}`,
          false
        );
        this.setState({ UserID: res.data.id });
      })
      .catch(err => {
        console.log(err);
        if (!err.status)
          this.handleServerResponseChange(
            500,
            "The server appears to be down",
            true
          );
        if (err.response)
          this.handleServerResponseChange(
            err.response.status,
            err.response.data.Error,
            true
          );
      });
  };


  setPendingServerResponse = () => {
    this.setState({
      pending: true,
      httpStatus: {
        code: "",
        message: "Request is processing",
        error: false
      }
    });
  };


  parseParameters = test => {
    let QueryParams = {};
    let Headers = {};
    let FormParams = {};
    let BasicAuth = {};
    let Body = {};
    for (var param in test.parameters) {
      const { type, key, value } = test.parameters[param];
      if (type === "Query") {
        QueryParams[key] = value;
      } else if (type === "Header") {
        Headers[key] = value;
      } else if (type === "Form") {
        FormParams[key] = value;
      } else if (type === "BasicAuth") {
        BasicAuth.username = key;
        BasicAuth.password = value;
      } else if (type === "Body") {
        Body.body = value;
      }
    }
    return {
      QueryParams,
      Headers,
      FormParams,
      BasicAuth,
      Body
    };
  };


  parseOutputs = test => {
    let ResponseCode = {};
    let ResponseHeader = {};
    let ResponseBody = {};
    for (var output in test.outputs) {
      const { type, key, value } = test.outputs[output];
      if (type === "Status Code") {
        ResponseCode = value;
      } else if (type === "Header") {
        ResponseHeader[key] = value;
      } else if (type === "Body-Path") {
        ResponseBody[key] = value;
      }
    }
    return {
      ResponseCode,
      ResponseHeader,
      ResponseBody
    };
  };


  handleServerResponseChange = (code, message, error) => {
    this.setState({
      pending: false,
      httpStatus: {
        code,
        message,
        error
      }
    });
  };

  render() {

    const { validationError } = this.props;

    return (
      <nav className="navbar navbar-dark flex-column sidebar">
        <div className="sidebar-upper" onClick={() => this.scrollToTop()}>
          <div>
            <img
              src={ApigeeShield}
              width="100px"
              height="100px"
              alt="apigee-shield"
            />
          </div>
          <div>
            <label>ASVP</label>
          </div>

          {validationError.exist && (
            <ErrorPanel>{validationError.message}</ErrorPanel>
          )}
        </div>

        <div className="sidebar-middle">

          <button
            disabled={validationError.exist}
            className="btn btn-outline-light btn-sm m-2"
            onClick={() => {
              this.props.onSubmitRequest();
            }}
          >
            Generate Tests
          </button>
          <button
            disabled={validationError.exist}
            className="btn btn-outline-light btn-sm m-2"
            onClick={() => this.props.onHttpGetRequest("run")}
          >
            Run Tests
          </button>
          <button
            disabled={validationError.exist}
            className="btn btn-outline-light btn-sm m-2"
            onClick={() => this.props.onHttpGetRequest("report")}
          >
            Generate Reports
          </button>
          <button
            className="btn btn-outline-light btn-sm m-2"
            onClick={handleSocialExit}
          >
            Log out
          </button>
          <ServerResponse httpStatus={this.props.httpStatus}>
            {this.props.pending && <Spinner animation="border" />}
          </ServerResponse>
        </div>

        <div className="sidebar-lower">
          <a href="https://www.github.com/rpierz-pk/asvp">
            <button className="btn btn-outline-light btn-sm m-2">GitHub Source</button>
          </a>
        </div>
      </nav>
    );
  }
}

export default Sidebar;
