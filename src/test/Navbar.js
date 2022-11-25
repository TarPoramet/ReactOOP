import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";



function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="">React for OOP </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/home">Home</Nav.Link> */}
            <NavDropdown title="RootofEquation" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Bisection">Bisection</NavDropdown.Item>
              <NavDropdown.Item href="/FalsePosition">False Position</NavDropdown.Item>
              <NavDropdown.Item href="/Onepoint">OnePoint Iteration</NavDropdown.Item>
              <NavDropdown.Item href="/NewtonRaphson">Newton</NavDropdown.Item>
              <NavDropdown.Item href="/Secant">Secant</NavDropdown.Item>
            </NavDropdown>
            {/* <NavDropdown title="Linear Algebraic Equation" id="basic-nav-dropdown">
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
} 
export default NavBar;
