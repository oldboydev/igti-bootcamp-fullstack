import React, { Component, Fragment } from 'react';
import Users from './components/users/Users';
import Toggle from './components/toggle/Toggle';

export default class App extends Component {
  constructor(){
    super();

    this.state = {
      users: [],
      showUsers: false
    }
  }

  async componentDidMount(){
    console.log("ComponenteDidMount de App.js")

    const res = await fetch("https://randomuser.me/api/?results=10");
    const json = await res.json();

    this.setState({
      users: json.results
    });
  }

  handleShowUsers = (isChecked) => {
    this.setState({
      showUsers: isChecked
    })
  }

  render() {
    const { showUsers, users } = this.state;

    return (
      <Fragment>
        <div>
          <h3> React LifeCycle</h3>
          <Toggle enabled={showUsers} onToggle={this.handleShowUsers}/>
          <hr />
          {
            showUsers && <Users users={users}/>
          }          
        </div>
      </Fragment>
    );
  }
}
