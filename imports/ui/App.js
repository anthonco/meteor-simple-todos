import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { withTracker } from 'meteor/react-meteor-data';
// eslint-disable-next-line import/no-unresolved
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks';

import Task from './Task';
import AccountsUIWrapper from './AccountsUIWrapper';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = this.newTaskField.value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(), // current time
      owner: Meteor.userId(), // _id of logged in user
      username: Meteor.user().username, // username of logged in user
    });

    // Clear form
    this.newTaskField.value = '';
  }

  toggleHideCompleted() {
    const { hideCompleted } = this.state;
    this.setState({
      hideCompleted: !hideCompleted,
    });
  }

  renderTasks() {
    const { hideCompleted } = this.state;
    let { tasks } = this.props;
    if (hideCompleted) {
      tasks = tasks.filter((task) => !task.checked);
    }
    return tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    const { currentUser, incompleteCount } = this.props;
    const { hideCompleted } = this.state;
    return (
      <div className="container">
        <header>
          <h1>
            Todo List(
            {incompleteCount}
          )
          </h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          { currentUser
            ? (
              <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                <input
                  type="text"
                  ref={(eltest) => {
                    this.newTaskField = eltest;
                    return this.newTaskField;
                  }}
                  placeholder="Type to add new tasks"
                />
              </form>
            ) : ''}
        </header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => ({
  tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  currentUser: Meteor.user(),
}))(App);
