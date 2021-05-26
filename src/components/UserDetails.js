import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Card,
  Button,
  ListGroup,
  Container,
  Jumbotron,
  Form,
  Modal,
} from "react-bootstrap";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [noUser, setNoUser] = useState(false);
  const [name, setName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);

  const history = useHistory();
  function handleClick(path) {
    history.push(path);
  }

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `https://young-fjord-40497.herokuapp.com/users/${id}`
        );
        const newUser = result.data.success.user;
        if (isMounted) setUser({ ...newUser });
      } catch (error) {
        setNoUser(true);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        `https://young-fjord-40497.herokuapp.com/users/${id}`
      );
      history.push("/users");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSaveChanges = () => {};

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleCloseModal = () => {
    setShowEditNameModal(false);
  };

  const handleEditName = (value) => {
    setName(user.name);
    setShowEditNameModal(true);
  };

  const handleChangeName = () => {};

  if (noUser) {
    return (
      <Jumbotron>
        <Jumbotron>
          <h1>404!</h1>
          <p>This user does not exist!</p>
          <p>
            <Button variant='primary' onClick={() => handleClick("/users")}>
              Go to users
            </Button>
          </p>
        </Jumbotron>
      </Jumbotron>
    );
  }
  if (!noUser)
    return (
      <Container className='mt-5'>
        <Modal
          show={showEditNameModal}
          onHide={handleCloseModal}
          animation={false}
        >
          <Modal.Header closeButton>Add relative</Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId='formName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={user.name}
                  onChange={(event) => setName(event.target.value)}
                  type='name'
                  placeholder='Enter your name'
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant='primary' onClick={handleChangeName}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <Container className='d-flex justify-content-end mb-5'>
          <Button className='ml-2' variant='danger' onClick={handleDelete}>
            Delete
          </Button>
        </Container>

        <Card className='text-center'>
          <Card.Header>My Family Tree </Card.Header>
          <Card.Body>
            <Card.Title>
              {user.name}{" "}
              <Button variant='link' onClick={handleEditName}>
                Edit
              </Button>
            </Card.Title>

            <ListGroup>
              {user.familyTree?.map((relative, index) => (
                <ListGroup.Item>
                  {`${index + 1} ${relative.name} - ${relative.relation} `}
                  <Button variant='link'>Edit</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    );
};

export default UserDetails;
