import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData() {
    axios.get('/contact')
      .then(res => {
        this.setState({ contacts: res.data });
      });
  }

  delete(id){
    axios.delete('/contact/'+id)
      .then((result) => {
        this.reloadData();
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          </div>
          <div class="panel-body">
            <table class="table table-striped table-sm table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.contacts.map(c =>
                  <tr>
                    <td>{c.name}</td>
                    <td>{c.emailAddress}</td>
                    <td>{c.phoneNumber}</td>
                    <td><Link to={`/edit/${c.id}`} class="btn btn-success">Edit</Link></td>
                    <td><button onClick={this.delete.bind(this, c.id)} class="btn btn-danger">Delete</button></td>
                  </tr>
                )}
              </tbody>
            </table>
            <h4><Link to="/create" class="btn btn-primary">Add Contact</Link></h4>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
