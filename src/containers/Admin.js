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
    };
  }

  populateReportOne() {
    console.log(this.state.reportOne);
    if (this.state.reportOne) {
      return this.state.reportOne.map((i) =>
        <ListGroupItem readOnly="readonly">{i.MONTH}/{i.YEAR} {i.RANK}. {i.USERNAME}: Gave {i.GIFT} and Redeemed {i.REDEEM}</ListGroupItem>
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
  }

  render() {
    return (
      <div className="Admin">
        <h2>Report 1: Monthly Report of Employee Kudos</h2>
        <ListGroup>
          {this.populateReportOne()}
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
