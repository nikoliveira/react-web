import React from "react";
import ReactDOM from "react-dom";

const Todo = props => (
  <li>
    <input
      checked={props.todo.checked}
      type="checkbox"
      onClick={props.onToggle}
    />
    <button onClick={props.onDelete}>delete</button>
    <span>{props.todo.text}</span>
  </li>
);

var _id = 0;
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  incrementTodo() {
    const text = prompt("Todo please");
    this.setState({
      todos: [...this.state.todos, { text, checked: false, id: _id++ }]
    });
  }

  removeTodo(id) {
    this.setState({ todos: this.state.todos.filter(t => t.id !== id) });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo;
        todo.checked = !todo.checked;
        return todo;
      })
    });
  }

  render() {
    return (
      <div>
        <div>
          <ul>
            <li>
              <b>All todos: </b>
              {this.state.todos.length}
            </li>
            <li>
              <b>Chk todos: </b>
              {this.state.todos.filter(t => t.checked).length}
            </li>
          </ul>
        </div>
        <button onClick={() => this.incrementTodo()}>Todo+1</button>
        <ul>
          {this.state.todos.map(todo => (
            <Todo
              todo={todo}
              onDelete={() => this.removeTodo(todo.id)}
              onToggle={() => this.toggleTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
