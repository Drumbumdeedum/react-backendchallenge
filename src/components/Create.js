import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      phoneNumber: '',
      emailAddress: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, phoneNumber, emailAddress } = this.state;
    axios.post('/contact', { name, phoneNumber, emailAddress })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { name, phoneNumber, emailAddress } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD CONTACT
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary backBtn">Back</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="published_date">Phone:</label>
                <input type="text" class="form-control" name="phoneNumber" value={phoneNumber} onChange={this.onChange} placeholder="Phone Number" />
              </div>
              <div class="form-group">
                <label for="publisher">Email:</label>
                <input type="email" class="form-control" name="emailAddress" value={emailAddress} onChange={this.onChange} placeholder="Email Address" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Create;
