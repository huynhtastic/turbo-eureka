import React, { Component } from "react";
import Cookies from 'universal-cookie';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import fetch from 'node-fetch';
import "./Employee.css";

const cookies = new Cookies();

export default class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedBalance: 0,
      giveableBalance: 0,
      recipient: "",
      amount: 1,
      giveableEmployees: undefined,
    }
  }

  validateForm() {
    return this.state.recipient === "";
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  populateEmployees() {
    if (this.state.giveableEmployees) {
      return this.state.giveableEmployees.map((emp) =>
        <option key={emp.USERNAME} readOnly="readonly" value={emp.USERNAME}>
          {emp.FIRST_NAME} {emp.LAST_NAME}
        </option>
      );
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3001/api/balances/${cookies.get('emp_id')}`)
      .then((res) => {
        if (res.status === 404) {
          alert('This employee does not exist');
          return {};
        } else {
          return res.json();
        }
      })
      .then((json) => {
        this.setState({
          receivedBalance: json.POINTS_RECEIVED,
          giveableBalance: json.POINTS_GIVEABLE,
        });
      });
    fetch(`http://localhost:3001/api/employees/${cookies.get('emp_id')}`)
      .then((res) => {
        if (res.status === 404) {
          return {};
        } else {
          return res.json();
        }
      })
      .then((json) => {
        console.log(json);
        this.setState({giveableEmployees: json});
      });
  }

  render() {
    return (
      <div className="Employee">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="current" bsSize="large">
            <ControlLabel>Received Balance</ControlLabel>
            <FormControl
              type="number"
              value={this.state.receivedBalance}
              readOnly="readonly"
            />
          </FormGroup>
          <FormGroup controlId="giveable" bsSize="large">
            <ControlLabel>Giveable Balance</ControlLabel>
            <FormControl
              type="number"
              value={this.state.giveableBalance}
              readOnly="readonly"
            />
          </FormGroup>
          <FormGroup controlId="recipient" bsSize="large">
            <ControlLabel>Give points to:</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="Employee"
              onChange={this.handleChange}
            >
              {this.populateEmployees()}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="amount" bsSize="large">
            <ControlLabel>Give amount:</ControlLabel>
            <FormControl
              min="1"
              type="number"
              onChange={this.handleChange}
              value={this.state.amount}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Give Points
          </Button>
        </form>
      </div>
    )
  }
}

