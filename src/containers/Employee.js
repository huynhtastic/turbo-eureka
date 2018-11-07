import React, { Component } from "react";
import Cookies from 'universal-cookie';
import { Button, FormGroup, FormControl, ControlLabel, ListGroup, ListGroupItem } from "react-bootstrap";
import datetime from 'node-datetime';
import fetch from 'node-fetch';
import env from '../env.js';
import "./Employee.css";

const cookies = new Cookies();

export default class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedBalance: 0,
      giveableBalance: 0,
      recipient: "",
      amount: 0,
      message: "",
      giveableEmployees: undefined,
      txnLogs: undefined,
    }
  }

  validateForm() {
    return this.state.recipient !== "" &&
      this.state.amount > 0 &&
      this.state.giveableBalance >= this.state.amount;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const dt = datetime.create();

    const transaction = {
      sender_id: cookies.get('emp_id'),
      recipient_username: this.state.recipient,
      amount: this.state.amount,
      txn_date: dt.format('Y-m-d H:M:S'),
      message: this.state.message,
    }

    fetch(`${env.apiUrl}/api/balances`, {
      method: 'POST',
      body:   JSON.stringify(transaction),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.status !== 200) {
          alert('Transaction failed');
        }
        window.location.reload()
      });

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

  populateLogs() {
    if (this.state.txnLogs) {
      return this.state.txnLogs.map((txn) => {
        var dt = datetime.create(txn.TXN_DATE);
        const ts = dt.format('m/d/y H:M:S');
        var msg = ''
        if (txn.RECIPIENT_ID === null) {
          msg = '';
        } else if (txn.SENDER_ID === parseInt(cookies.get('emp_id'))) {
          msg = `to ${txn.RECIPIENT}`;
        } else {
          msg = `from ${txn.SENDER}`;
        }

        return <ListGroupItem key={txn.TXN_ID}>{ts} {txn.AMOUNT} <b>{msg}</b>: {txn.MESSAGE}</ListGroupItem>
      }
      );
    }
  }

  componentDidMount() {
    fetch(`${env.apiUrl}/api/balances/${cookies.get('emp_id')}`)
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
    fetch(`${env.apiUrl}/api/employees/${cookies.get('emp_id')}`)
      .then((res) => {
        if (res.status === 404) {
          return {};
        } else {
          return res.json();
        }
      })
      .then((json) => {
        this.setState({giveableEmployees: json});
        if (this.state.recipient === "") {
          this.setState({
            recipient: json[0].USERNAME,
          });
        }
      });
    fetch(`${env.apiUrl}/api/transactions/${cookies.get('emp_id')}`)
      .then((res) => {
        if (res.status === 404) {
          return {};
        } else {
          return res.json();
        }
      })
      .then((json) => {
        console.log(json);
        if (Object.keys(json).length !== 0 || json.length !== 0) {
          this.setState({txnLogs: json});
        }
      });
  }

  render() {
    return (
      <div className="Employee">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="txnLog" bsSize="small">
            <ControlLabel>Transaction Log</ControlLabel>
            <ListGroup>
              {this.populateLogs()}
            </ListGroup>
          </FormGroup>
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
              min="0"
              max={this.state.giveableBalance}
              type="number"
              onChange={this.handleChange}
              value={this.state.amount}
            />
          </FormGroup>
          <FormGroup controlId="message" bsSize="large">
            <ControlLabel>Message:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.message}
              onChange={this.handleChange}
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

