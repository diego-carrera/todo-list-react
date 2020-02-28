import React from 'react';
import Todos from './Todos';

const Home = (props) => {

  const renderLanding = () => {
    return(
      <div className="home">
        <div className="lander">
          <h1>TODO</h1>
          <p>App todo list</p>
        </div>
      </div>
    );
  };

  const renderTodos = () => {
    return(
      <div className="todos">
        <Todos></Todos>
      </div>
    );
  };

  return (
    <div className="home">
      {props.isAuthenticated ? renderTodos() : renderLanding() }
    </div>
  );

};

export default Home;
