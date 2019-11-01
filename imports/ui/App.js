import React, { Component } from 'react';
// eslint-disable-next-line import/no-unresolved
import { withTracker } from 'meteor/react-meteor-data';
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
    let filteredTasks = this.props.tasks;
    if (hideCompleted) {
      filteredTasks = filteredTasks.filter((task) => !task.checked);
    }
    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper />
 
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              ref={(eltest) => {
                this.newTaskField = eltest;
                return this.newTaskField;
              }}
              className="textImput"
              placeholder="Type to add new tasks"
            />
          </form>
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
}))(App);
