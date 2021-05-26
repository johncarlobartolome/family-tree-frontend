import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar bg='light'>
        <Navbar.Brand href='/'>Family Tree</Navbar.Brand>
        <Nav>
          <Nav.Link href='/users'>Show users</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href='/users/add'>Add User</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
