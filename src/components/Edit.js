import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contact: {}
    };
  }

  componentDidMount() {
    axios.get('/contact/'+this.props.match.params.id)
      .then(res => {
        this.setState({ contact: res.data });
      });
  }

  onChange = (e) => {
    const state = this.state.contact
    state[e.target.name] = e.target.value;
    this.setState({contact:state});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, phoneNumber, emailAddress } = this.state.contact;
    axios.put('/contact/'+this.props.match.params.id, { name, phoneNumber, emailAddress })
      .then((result) => {
        this.props.history.push("/edit/"+this.props.match.params.id)
      });
  }

  delete(id){
    axios.delete('/contact/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT Contact
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/`} class="btn btn-primary backBtn">Back</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={this.state.contact.name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="published_date">Phone Number:</label>
                <input type="text" class="form-control" name="phoneNumber" value={this.state.contact.phoneNumber} onChange={this.onChange} placeholder="Phone" />
              </div>
              <div class="form-group">
                <label for="description">Email:</label>
                <input type="email" class="form-control" name="emailAddress" value={this.state.contact.emailAddress} onChange={this.onChange} placeholder="Email" />
              </div>
              <button type="submit" class="btn btn-success">Update</button>
              <button onClick={this.delete.bind(this, this.state.contact.id)} class="btn btn-danger">Delete</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Edit;
