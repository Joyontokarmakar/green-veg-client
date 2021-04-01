import './Header.css';
import logo from './greenVegLogo.png';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useContext } from 'react';
import { userContext } from '../../App';

function Header() {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  return (
    <div className="Header">
      <div className="container">
        <Navbar expand="lg">
          <Link to="/" className="link-text"><img src={logo} alt="Volunteer Network" className="w-25" /></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-links">
              <Link to="/admin" className="link-text">Admin</Link>
              <Link to="/" className="link-text">Home</Link>
              <Link to="/login" className="link-text"> Login </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  )
}

export default Header;