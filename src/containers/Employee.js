import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Employee.css";

export default class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBalance: 0,
      kudosBalance: 0
    }
  }

  render() {
    return (
      <div className="Employee">
        <form onsubmit={this.handleSubmit}>
          <FormGroup controlId="current" bsSize="large">
            <ControlLabel>Current Balance</ControlLabel>
            <FormControl
              type="number"
              value={this.state.currentBalance}
              readonly="readonly"
            />
          </FormGroup>
          <FormGroup controlId="kudos" bsSize="large">
            <ControlLabel>Kudos Balance</ControlLabel>
            <FormControl
              type="number"
              value={this.state.kudosBalance}
              readonly="readonly"
            />
          </FormGroup>
        </form>
      </div>
    )
  }
}

