import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, ListGroup, Jumbotron, Button } from "react-bootstrap";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const handleClick = (path) => {
    history.push(path);
  };
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const result = await axios.get("https://young-fjord-40497.herokuapp.com/users");
      const newUsers = result.data.success.users;
      if (isMounted) setUsers(() => [...newUsers]);
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <Container>
      <ListGroup className='mt-5 pb-5'>
        {users.length === 0 ? (
          <Jumbotron>
            <h1>User's list is empty</h1>
            <p>Click the button to add a user with family tree</p>
            <p>
              <Button
                variant='primary'
                onClick={() => handleClick("/users/add")}
              >
                Add user
              </Button>
            </p>
          </Jumbotron>
        ) : (
          users.map((user) => (
            <ListGroup.Item
              className='d-flex justify-content-between'
              key={user._id}
            >
              {user.name}
              <Button
                className='ml-5'
                onClick={() => handleClick(`/users/${user._id}`)}
              >
                See details
              </Button>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Container>
  );
};

export default UserList;
