import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";

export class Signup extends React.Component {
  state = {
    email: "",
    name: "",
    password: "",
    cpassword: ""
  };
  send = async () => {
    const { email, name, password, cpassword } = this.state;
    if (!email || email.length === 0) return;
    if (!name || name.length === 0) return;
    if (!password || password.length === 0 || password !== cpassword) return;
    try {
      const { data } = await API.signup({ email, password, name });
      localStorage.setItem("token", data.token);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { email, name, password, cpassword } = this.state;
    return (
      <div className="Login">
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={this.handleChange}
          />
          </FormGroup>
          <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            autoFocus
            type="name"
            value={name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="cpassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={cpassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={this.send} block bsSize="large" type="submit">
          Inscription
        </Button>
        <Button href="/" block bsSize="large">Back</Button>
      </div>
    );
  }
}