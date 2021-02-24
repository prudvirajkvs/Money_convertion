import React, { useState } from 'react';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { auth, provider } from './firebase';
import store from './store';
import { actionTypes } from './reducer';

function Login() {
  const [user_name, setUser_name] = useState('');
  const [password, setPassword] = useState('');

  const [reg_user, setReg_user] = useState('');
  const [reg_pass, setReg_pass] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show_forgot, setShow_forgot] = useState(false);
  const [forgot_email, setForgot_email] = useState('');
  const handleClose_forgot = () => setShow_forgot(false);
  const handleShow_forgot = () => setShow_forgot(true);

  const loginUser = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(user_name, password)
      .then((result) => {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result));
        store.dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const googleSignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result));
        store.dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const registerUser = () => {
    auth
      .createUserWithEmailAndPassword(reg_user, reg_pass)
      .then((dt) => {
        handleClose();
        alert('user creation success please login with the registered details');
      })
      .catch((e) => alert(e.message));
  };
  const forgot_pass = () => {
    auth
      .sendPasswordResetEmail(forgot_email)
      .then((dt) => {
        alert('passord reset link sent to email');
        handleClose_forgot();
      })
      .catch((e) => alert(e.message));
  };
  return (
    <div>
      <Header />
      <form onSubmit={loginUser}>
        <div className="form-group m-2">
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            className="form-control"
            type="text"
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
          />
        </div>
        <div className="form-group m-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="light" className="container mt-3 " type="submit">
          Login
        </Button>
        <span className="text-secondary">Don't have account</span>
        <Button className="m-2 " onClick={handleShow}>
          signUp
        </Button>
      </form>
      <span className="text-secondary btn " onClick={handleShow_forgot}>
        forgot passwrod.............!
      </span>
      <hr />
      <Button onClick={googleSignIn}>Use Google</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up to Money Convertion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group m-2">
              <label htmlFor="username">User Email</label>
              <input
                id="username"
                className="form-control"
                type="text"
                value={reg_user}
                onChange={(e) => setReg_user(e.target.value)}
              />
            </div>
            <div className="form-group m-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="form-control"
                type="password"
                value={reg_pass}
                onChange={(e) => setReg_pass(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={registerUser}>
            Register User
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show_forgot} onHide={handleClose_forgot}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up to Money Convertion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group m-2">
              <label htmlFor="username">Email</label>
              <input
                id="username"
                className="form-control"
                type="text"
                value={forgot_email}
                onChange={(e) => setForgot_email(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_forgot}>
            Close
          </Button>
          <Button variant="primary" onClick={forgot_pass}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
