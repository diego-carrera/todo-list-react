import React, {useState} from 'react';
import {
  Form, Button, Card
} from 'react-bootstrap';
import Api from '../utils/api';
import Auth from '../utils/auth';


const Register = (props) => {

  const [email,    setEmail]    = useState('');
  const [nick,     setNick]     = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  /**
   * @param {event} e event
   */
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    Api.register(email, nick, password)
    .then((response) => {
      setIsLoading(false);

      const data = response.data;
      if ( data.success ) {
        const {user, token} = data;
        props.userHasAuthenticated(true);

        Auth.setAuthStatus(true);
        Auth.setUser(user);
        Auth.setToken(token);
        Api.setAuthorization();

        props.history.push('/');
      } else {
        alert("No se pudo registrar\n"+ JSON.stringify(data.errors));
      }
    })
    .catch((error) => {
      console.log(error);
    });

  };

  return(
    <div className="register">
      <Card style={{width:'30rem', margin:'1rem auto'}}>
        <Card.Body>
          <Card.Title>Create a new account</Card.Title>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group controlId="user-email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" required
                value={email} onChange={(e) => setEmail( e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="user-nick">
              <Form.Label>Nick:</Form.Label>
              <Form.Control type="text" required
                value={nick} onChange={(e) => setNick( e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="user-password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" required
                value={password} onChange={(e) => setPassword( e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" block>
              { isLoading ? <i className="fa fa-spinner fa-spin"/> : 'Login' }
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </div>
  );

};

export default Register;
