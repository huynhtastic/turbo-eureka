import React, { Component } from 'react';
import { Checkbox, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import fetch from 'node-fetch';
import './Register.css';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      admin: 0,
      redirect: false,
    };
  }

  validateForm = () => {
    return this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.email.length > 0 &&
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleCheck = (event) => {
    this.setState({
      [event.target.id]: event.target.checked === true ? 1 : 0
    });
    console.log(this.state);
  }

  handleSubmit = event => {
    event.preventDefault();
    const registration = this.state;
    delete registration.redirect;

    this.setState({ error: false });
    fetch('http://localhost:3001/api/register', {
      method: 'POST',
      body:   JSON.stringify(registration),
      headers: { 'Content-Type': 'application/json' },
    })
    // TODO: change alerts to bootstrap alerts
      .then((res) => {
        if (res.status === 404) {
          alert('Registration Unsuccessful');
          return;
        } else {
          this.setState({ redirect: true });
        }
      })
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/login' />;
    }

    return (
      <div className="Register">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId='username' bsSize='large'>
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type='text'
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId='password' bsSize='large'>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId='email' bsSize='large'>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId='firstName' bsSize='large'>
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              type='text'
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId='lastName' bsSize='large'>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              type='text'
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId='admin' bsSize='large'>
            <Checkbox 
              id='admin'
              value={this.state.admin}
              onChange={this.handleCheck}
              inline
            >
              Admin
            </Checkbox>
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    )
  }
}
