import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import fetch from 'node-fetch';
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      redirect: false,
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const login = {
      username: this.state.username,
      password: this.state.password,
    };

    this.setState({ error: false });
    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      body:   JSON.stringify(login),
      headers: { 'Content-Type': 'application/json' },
    })
    // TODO: change alerts to bootstrap alerts
      .then((res) => {
        if (res.status === 404) {
          alert('Invalid Credentials');
          return {};
        } else {
          return res.json();
        }
      })
      .then((json) => {
        this.setCookie(json);
      });
  }

  setCookie = (json) => {
    const cookies = new Cookies();
    console.log(json);

    let d = new Date();
    d.setTime(d.getTime() + 60*10000);
    cookies.set('emp_id', json.EMP_ID, {
      path: '/',
      expires: d,
    });
    cookies.set('admin', json.ADMIN, {
      path: '/',
      expires: d,
    });
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;

    if (redirect ) {
      return <Redirect to='/employee'/ >;
    }

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              defaultValue={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
