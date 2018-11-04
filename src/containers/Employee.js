import React, { Component } from "react";
import Cookies from 'universal-cookie';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Employee.css";

const cookies = new Cookies();

export default class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBalance: 0,
      kudosBalance: 0,
    }
  }

  render() {
    console.log(cookies.get('emp_id'));
    return (
      <div className="Employee">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="current" bsSize="large">
            <ControlLabel>Current Balance</ControlLabel>
            <FormControl
              type="number"
              value={this.state.currentBalance}
              readOnly="readonly"
            />
          </FormGroup>
          <FormGroup controlId="kudos" bsSize="large">
            <ControlLabel>Kudos Balance</ControlLabel>
            <FormControl
              type="number"
              value={this.state.kudosBalance}
              readOnly="readonly"
            />
          </FormGroup>
        </form>
      </div>
    )
  }
}

