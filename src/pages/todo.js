import React, { Component } from "react";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import Priority from "../constants/priority";
import "../styles/todo-page.css";

export default class TodoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      completedTodos: [],
      showCompleted: false,
    };
  }
  handleAddTodo = (text, priority) => {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: Date.now().toString(),
          text,
          priority,
          completed: false,
        },
      ],
    });
  };
  toggleTodo = (id) => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    const newCompletedTodos = newTodos.filter((todo) => {
      return todo.completed === true;
    });

    this.setState({
      todos: newTodos,
      completedTodos: newCompletedTodos,
    });
  };

  handleDeleteTodo = (id) => {
    const newTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: newTodos });
  };
  toggleShowCompleted = () => {
    this.setState((prevState) => ({
      showCompleted: !prevState.showCompleted,
    }));
  };
  addMockData = () => {
    setTimeout(() => {
      this.setState((prevState) => ({
        todos: [
          ...this.state.todos,
          {
            id: Date.now().toString(),
            text: "Hello from Udacity",
            completed: false,
            priority: Priority.LOW,
          },
        ],
        completedTodos: this.state.todos.filter(
          (todo) => todo.completed === true
        ),
      }));
    }, 1000);
  };

  componentDidMount() {
    /* to simulate an API call */
    this.addMockData();
  }
  render() {
    return (
      <section className="dashboard-page main-page">
        <header className="page-header-container">
          <h1>Todo List 📌</h1>
        </header>

        <AddTodoForm handleAddTodo={this.handleAddTodo} />
        <div>
          <label for="showCompleted">Show Completed</label>
          <input
            type="checkbox"
            onChange={this.toggleShowCompleted}
            id="showCompleted"
          />
        </div>

        {this.state.showCompleted ? (
          <TodoList
            {...{
              todos: this.state.completedTodos,
              toggleTodo: this.toggleTodo,
              handleDeleteTodo: this.handleDeleteTodo,
              handleAddTodo: this.handleAddTodo,
            }}
          />
        ) : (
          <TodoList
            {...{
              todos: this.state.todos,
              toggleTodo: this.toggleTodo,
              handleDeleteTodo: this.handleDeleteTodo,
              handleAddTodo: this.handleAddTodo,
            }}
          />
        )}
      </section>
    );
  }
}
