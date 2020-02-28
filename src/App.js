import React, {useState, useEffect} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Routes from './routes';
import Auth from './utils/auth';
import Api from './utils/api';
import axios from 'axios';

const App = (props) => {

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {

    const isLoggedIn = Auth.getAuthStatus();
    if ( isLoggedIn ) {
      Api.setAuthorization();
      userHasAuthenticated(true);
    }
    setIsAuthenticating(false);
  };

  const handleLogout = () => {
    delete axios.defaults.headers.common.authorization;
    Auth.clearSession(false);
    userHasAuthenticated(false);
  };

  return(
    !isAuthenticating &&
    <div className="app">

      <Navbar bg="dark" variant="dark" expand="lg">

        <Navbar.Brand>
          <Link className="navbar-brand" to="/">TodoApp</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="auto-md">
            {
              isAuthenticated ?
                <Nav.Item>
                  <Nav.Link onClick={ handleLogout }>Logout</Nav.Link>
                </Nav.Item>
              :
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container">
        <Routes appProps={{isAuthenticated, userHasAuthenticated}}/>
      </div>

    </div>
  )
};

export default App;
