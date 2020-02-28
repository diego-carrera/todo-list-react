import React from 'react';
import { Card } from 'react-bootstrap';

const NotFound = () => {

  return (
    <div className="not-found">
      <Card>
        <Card.Body>
          <Card.Title>404 - Not Found</Card.Title>
          <Card.Text>Content not found, please try again.</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

};

export default NotFound;
