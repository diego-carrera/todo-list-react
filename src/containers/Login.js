import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import Auth from '../utils/auth';
import Api from '../utils/api';

/**
 * Login component
 * @augment {Component<Props, State>}
 */

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the submit of the form
   * @param {event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    Api.login(email, password)
    .then(function(response) {
      setIsLoading(false);
      const {user, token} = response.data;
      props.userHasAuthenticated(true);

      Auth.setAuthStatus(true);
      Auth.setUser(user);
      Auth.setToken(token);
      Api.setAuthorization();

      props.history.push('/');

    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });

  };

  return (
    <div className="Login">
      <Card style={{width:'30rem', margin:'1rem auto'}}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email" placeholder="Email" autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password" placeholder="Password" autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isLoading} block>
              { isLoading ? 'Loading...' : 'Login' }
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );

};

export default Login;
