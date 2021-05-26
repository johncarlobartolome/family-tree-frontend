import axios from "axios";
import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Modal,
  ListGroup,
  Alert,
} from "react-bootstrap";

const AddUser = () => {
  const [relatives, setRelatives] = useState([]);
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentRelativeName, setCurrentRelativeName] = useState("");
  const [currentRelativeRelation, setCurrentRelativeRelation] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = () => {
    handleClose();
    if (currentRelativeName && currentRelativeRelation) {
      const newList = relatives.concat({
        name: currentRelativeName,
        relation: currentRelativeRelation,
      });
      setRelatives(newList);
    }

    setCurrentRelativeName("");
    setCurrentRelativeRelation("");
  };

  const handleSubmit = async () => {
    const data = { name, familyTree: [...relatives] };
    try {
      const result = await axios.post(
        "https://young-fjord-40497.herokuapp.com/users",
        data
      );
      setShowAlert(false);
      setShowSuccess(true);
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data.error;
        setError({ ...errorData });
        setShowSuccess(false);
        setShowAlert(true);
      }
    }
  };

  return (
    <>
      <Container>
        {showAlert == true ? (
          <Alert
            className='mt-5'
            variant='danger'
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>{error.title}</Alert.Heading>
            <p>{error.message}</p>
            <ul>
              {error.invalidParams.map((param) => (
                <li>{`${param.message}`}</li>
              ))}
            </ul>
          </Alert>
        ) : (
          <></>
        )}
        {showSuccess == true ? (
          <Alert
            className='mt-5'
            variant='success'
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            <Alert.Heading>User created!</Alert.Heading>
            <p>
              Your family tree has been added. You can view it in the users
              page.
            </p>
          </Alert>
        ) : (
          <></>
        )}
        <Container className='d-flex justify-content-end mt-5'>
          <Button className='ml-5' variant='secondary' onClick={handleShow}>
            Add relative
          </Button>
          <Button className='ml-5' variant='primary' onClick={handleSubmit}>
            Submit
          </Button>
        </Container>

        <Form>
          <Form.Group controlId='formName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(event) => setName(event.target.value)}
              type='name'
              placeholder='Enter your name'
            />
          </Form.Group>
          <ListGroup>
            {relatives.map((relative, index) => (
              <ListGroup.Item>
                {`${index + 1}. ${relative.name} - ${relative.relation}`}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>Add relative</Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId='formName'>
                  <Form.Label>Relative's Name</Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      setCurrentRelativeName(event.target.value)
                    }
                    type='name'
                    placeholder='Enter your name'
                  />
                  <Form.Label>Relation</Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      setCurrentRelativeRelation(event.target.value)
                    }
                    type='name'
                    placeholder='Enter relation'
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' onClick={handleAdd}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </Container>
    </>
  );
};

export default AddUser;
