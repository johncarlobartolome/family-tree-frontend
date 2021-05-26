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
  const [currentRelativeIndex, setCurrentRelativeIndex] = useState(0);
  const [currentRelative, setCurrentRelative] = useState("");
  const [currentRelation, setCurrentRelation] = useState("");
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showEditRelativeModal, setShowEditRelativeModal] = useState(false);

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
  });

  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        `https://young-fjord-40497.herokuapp.com/users/${id}`
      );
      console.log(result);
      history.push("/users");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCloseModal = () => {
    setShowEditNameModal(false);
    setShowEditRelativeModal(false);
  };

  const handleEditName = (value) => {
    setName(user.name);
    setShowEditNameModal(true);
  };

  const handleChangeRelative = async () => {
    if (currentRelative && currentRelation) {
      const newFamilyTree = user.familyTree[currentRelativeIndex];
      newFamilyTree["name"] = currentRelative;
      newFamilyTree["relation"] = currentRelation;
      setUser((prevState) => ({
        ...prevState,
      }));
      try {
        await axios.patch(
          `https://young-fjord-40497.herokuapp.com/users/${id}`,
          {
            name: user.name,
            familyTree: user.familyTree,
          }
        );
        handleCloseModal();
      } catch (error) {
        console.log(error.response);
        handleCloseModal();
      }
    }
  };

  const handleChangeName = async () => {
    if (name) {
      const newUser = { ...user };
      newUser.name = name;
      setUser((prevState) => ({
        ...prevState,
        ...newUser,
      }));
      try {
        await axios.patch(
          `https://young-fjord-40497.herokuapp.com/users/${id}`,
          {
            name: name,
            familyTree: user.familyTree,
          }
        );
        setShowEditNameModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
          <Modal.Header closeButton>Edit name</Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId='formName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
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
              Update
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showEditRelativeModal}
          onHide={handleCloseModal}
          animation={false}
        >
          <Modal.Header closeButton>Edit relative info</Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={currentRelative}
                  onChange={(event) => setCurrentRelative(event.target.value)}
                  type='nameRelative'
                  placeholder="Enter your relative's name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Relation</Form.Label>
                <Form.Control
                  value={currentRelation}
                  onChange={(event) => setCurrentRelation(event.target.value)}
                  type='relation'
                  placeholder='Enter your relation'
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant='primary' onClick={handleChangeRelative}>
              Update
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
                <ListGroup.Item key={index}>
                  {`${index + 1}. ${relative.name} - ${relative.relation} `}
                  <Button
                    variant='link'
                    onClick={() => {
                      setCurrentRelativeIndex(index);
                      setCurrentRelative(relative.name);
                      setCurrentRelation(relative.relation);
                      setShowEditRelativeModal(true);
                    }}
                  >
                    Edit
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    );
};

export default UserDetails;
