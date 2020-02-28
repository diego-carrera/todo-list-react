import React, { useState, useEffect } from 'react';
import Api from '../utils/api';
import { Button, Card, Form, Col } from 'react-bootstrap';

const Todos = (props) => {

  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [todosLoaded, setTodosLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    onLoad();
  }, [])

  const onLoad = async () => {
    console.log('onload');

    Api.getTodos()
    .then((response) => {
      setTodos(response.data.todos);
      setTodosLoaded(true);
    });

  };

  /**
   * Marks a todo as complete
   * @param {number} idx the index
   */
  const markComplete = (idx) => {
    const currentTodos = todos.slice();
    const currentTodo = currentTodos[idx];

    Api.markComplete(currentTodo.id)
    .then((response) => {
      currentTodo.completed = true;
      currentTodos[idx] = currentTodo;
      setTodos(currentTodos);
    });

  };

  /**
   * Deletes a todo
   * @param {number} idx idx
   */
  const deleteTodo = (idx) => {
    const currentTodos = todos.slice();
    const toDelete = currentTodos[idx];

    Api.deleteTodo(toDelete.id)
    .then((response) => {
      currentTodos.splice(idx, 1);
      setTodos(currentTodos);
    });

  };

  /**
   * Handles the submit of a new task
   * @param {event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Api.createTodo(task)
    .then((response) => {
      const data = response.data;
      if ( data.success ) {
        const newTodos = [].concat( [data.todo], todos );
        setTodos(newTodos);
      }
      setTask('');
      setIsSubmitting(false);
    });

  };

  const allTodos = todos.map((todo, idx) => {

    const createdDate = new Date(todo.created);

    return(
      <tr key={todo.id}>
        <td className="text-justify">
          {todo.completed ? <i className="fa fa-check text-success"/> :  <i className="fa fa-times text-secondary"/>} {todo.task}
        </td>
        <td className="text-right">
          {createdDate.toLocaleString()}
        </td>
        <td className="text-right">
          <Button size="sm" variant="danger" onClick={() => deleteTodo(idx) }>
            <i className="fa fa-trash"/>
          </Button>
          {
            !todo.completed &&
            <Button size="sm" variant="success" onClick={() => markComplete(idx)}>
              <i className="fa fa-check"/>
            </Button>
          }
        </td>
      </tr>
    );
  });

  const renderTodos = () => {
    return (
      <table className="table table-striped table-bordered table-md">
        <thead className="thead-dark">
          <tr>
            <th className="text-center">Tarea</th>
            <th className="text-center">Fecha</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {allTodos}
        </tbody>
      </table>
    );
  };

  return(
    <div>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Control
                  type="text" placeholder="To-Do" required
                  value={task}
                  onChange={(e) => setTask(e.target.value) }
                ></Form.Control>
              </Col>
              <Col xs="2">
                <Button variant="primary" type="submit" block disabled={isSubmitting}>
                  { !isSubmitting ? <i className="fa fa-plus"/> : <i className="fa fa-spinner fa-spin"/>}
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
      <div className="todos-container">
        {
          todosLoaded ? renderTodos() :
          <i className="fa fa-circle-notch fa-spin"/>
        }
      </div>
    </div>
  );

};

export default Todos;
