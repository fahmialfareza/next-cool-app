import Link from "next/link";
import { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import {
  userSignUp,
  userSignIn,
  signOut,
  restore,
} from "../redux/actions/main";
import Register from "./Register";
import Login from "./Login";

const Header = ({ userSignUp, userSignIn, signOut, restore, userInfo }) => {
  const [show, handleClose] = useState(false);
  const [showSignIn, handleCloseSignIn] = useState(false);
  const [form, setFormValue] = useState({});

  const register = () => userSignUp(form);
  const signIn = () => userSignIn(form);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_info"));
    if (userData) {
      restore(userData);
    }
  }, []);

  return (
    <div className="mb-2">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link href="/">
            <a className="text-white">My Cool App</a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/weather">
              <a className="nav-link">Weather</a>
            </Link>
            <Link href="/todo">
              <a className="nav-link">Todo</a>
            </Link>
          </Nav>
          {userInfo.token && (
            <Nav>
              <NavDropdown
                title={`Welcome ${userInfo.name}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={() => signOut()}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
          {!userInfo.token && (
            <Nav>
              <Nav.Link onClick={() => handleCloseSignIn(true)}>
                Sign In
              </Nav.Link>
              <Nav.Link onClick={() => handleClose(true)}>Register</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>

        <Register
          show={show && !userInfo.token}
          setShow={handleClose}
          form={form}
          setFormValue={setFormValue}
          register={register}
          error={userInfo.error}
          isLoading={userInfo.loading}
        />

        <Login
          show={showSignIn && !userInfo.token}
          setShow={handleCloseSignIn}
          form={form}
          setFormValue={setFormValue}
          signIn={signIn}
          error={userInfo.error}
          isLoading={userInfo.loading}
        />
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.main,
});

const mapDispatchToProps = {
  userSignUp,
  userSignIn,
  signOut,
  restore,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
