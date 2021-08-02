import React from 'react';
import { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div>
            <Navbar bg="info" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src="https://i.ibb.co/xmP1MWf/cityriders.jpg"
                            width="100"
                            className="img-fluid"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/home"><strong>Home</strong></Nav.Link>
                            <Nav.Link as={Link} to="/destination"><strong>Destination</strong></Nav.Link>
                            <Nav.Link as={Link} to="/blog"><strong>Blog</strong></Nav.Link>
                            <Nav.Link as={Link} to="/contact"><strong>Contact</strong></Nav.Link>
                            {loggedInUser.displayName ? (
                                <>
                                  <strong> Welcome! {loggedInUser.displayName} </strong>  
                                </>
                            ) : (
                                <Nav.Link as={Link} to="/login" className="loginMenu">
                                   <Button> Login</Button>
                                </Nav.Link>
                            )}
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;