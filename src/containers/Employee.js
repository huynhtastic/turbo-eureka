import React, { Component } from "react";
import Cookies from 'universal-cookie';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Employee.css";

const cookies = new Cookies();

export default class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedBalance: 0,
      giveableBalance: 0,
    }
  }

  componentDidMount() {
    console.log('asdf');
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
        console.log(json);
        this.setState({
          receivedBalance: json.POINTS_RECEIVED,
          giveableBalance: json.POINTS_GIVEABLE,
        });
        console.log(this.state);
      });
  }

  render() {
    return (
      <div className="Employee">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="current" bsSize="large">
            <ControlLabel>Current Balance</ControlLabel>
            <FormControl
              type="number"
              value={this.state.receivedBalance}
              readOnly="readonly"
            />
          </FormGroup>
          <FormGroup controlId="kudos" bsSize="large">
            <ControlLabel>Kudos Balance</ControlLabel>
            <FormControl
              type="number"
              value={this.state.giveableBalance}
              readOnly="readonly"
            />
          </FormGroup>
        </form>
      </div>
    )
  }
}

