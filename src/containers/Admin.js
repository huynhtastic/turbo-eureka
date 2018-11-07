import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, ListGroup, ListGroupItem } from "react-bootstrap";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import fetch from 'node-fetch';
import env from '../env.js';
import "./Admin.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportOne: undefined,
      reportTwo: undefined,
      reportThree: undefined,
    };
  }

  populateReportOne() {
    if (this.state.reportOne) {
      return this.state.reportOne.map((i) =>
        <ListGroupItem readOnly="readonly">{i.MONTH}/{i.YEAR} {i.RANK}. {i.USERNAME}: Gave {i.GIFT} and Redeemed {i.REDEEM}</ListGroupItem>
      );
    }
  }

  populateReportTwo() {
    if (this.state.reportTwo) {
      return this.state.reportTwo.map((i) =>
        <ListGroupItem readOnly="readonly">{i.USERNAME}: {i.POINTS_GIVEABLE} Points</ListGroupItem>
      );
    }
  }

  populateReportThree() {
    if (this.state.reportThree) {
      return this.state.reportThree.map((i) =>
        <ListGroupItem readOnly="readonly">Month {i.MONTH}: {i.USERNAME} {i.REDEMPTION_COUNT} Redemptions</ListGroupItem>
      );
    }
  }

  componentDidMount() {
    fetch(`${env.apiUrl}/api/reports/1`)
      .then((res) => {
        if (res.status === 404) {
          alert('Error loading report 1');
          return {};
        } else {
          return res.json();
        }
      })
      .then((json) => {
        this.setState({
          reportOne: json,
        });
      });
    fetch(`${env.apiUrl}/api/reports/2`)
      .then((res) => {
        if (res.status === 404) {
          alert('Error loading report 2');
          return {};
        } else {
          return res.json();
        }
      })
      .then((json) => {
        this.setState({
          reportTwo: json,
        });
      });
    fetch(`${env.apiUrl}/api/reports/3`)
      .then((res) => {
        if (res.status === 404) {
          alert('Error loading report 3');
          return {};
        } else {
          return res.json();
        }
      })
      .then((json) => {
        this.setState({
          reportThree: json,
        });
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      flag: 'reset',
    }

    fetch(`${env.apiUrl}/api/balances`, {
      method: 'POST',
      body:   JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.status !== 200) {
          alert('Reset failed');
        }
        window.location.reload()
      });
  }

  render() {
    return (
      <div className="Admin">
        <h2>Report 1: Monthly Report of Employee Kudos</h2>
        <ListGroup>
          {this.populateReportOne()}
        </ListGroup>
        <h2>Report 2: Employees With Points Left To Give</h2>
        <ListGroup>
          {this.populateReportTwo()}
        </ListGroup>
        <h2>Report 3: Employee Redemption For Past 2 Months (+ Current Month)</h2>
        <ListGroup>
          {this.populateReportThree()}
        </ListGroup>
        <form onSubmit={this.handleSubmit}>
          <Button
            block
            bsSize="large"
            type="submit"
          >
            Reset Month
          </Button>
        </form>
      </div>
    );
  }
}
