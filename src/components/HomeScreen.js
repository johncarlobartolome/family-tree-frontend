import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const HomeScreen = () => {
  const history = useHistory();
  function handleClick(path) {
    history.push(path);
  }
  return (
    <div>
      <Jumbotron>
        <h1>Welcome to Family Tree</h1>
        <p>Click the button to proceed and add entry</p>
        <p>
          <Button variant='primary' onClick={() => handleClick("/users/add")}>
            Add user
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default HomeScreen;
