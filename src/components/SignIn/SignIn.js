import './SignIn.css';
import React, { useRef, useContext } from 'react';
import { useForm } from "react-hook-form";
import { Card, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { useState } from 'react';

function SignIn() {
  const [user, setUser] = useContext(userContext);
  const [isNewUser, setIsNewUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = data => {
    setErrorMsg('');
    if (isNewUser) {
      fetch(`https://boiling-oasis-42648.herokuapp.com/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.ok) {
            const newUser = { ...user };
            newUser.isLoggedIn = true;
            newUser.username = data.username;
            newUser.email = data.email;
            setUser(newUser);
            history.replace(from);
          }
        })
    } else {
      fetch(`https://boiling-oasis-42648.herokuapp.com/signin?email=${data.email}&password=${data.password}`)
      .then(res => res.json())
      .then(data => {
        if(data.error){
          setErrorMsg(data.error)
        } else {
          setErrorMsg('');
          const newUser = { ...user };
          newUser.isLoggedIn = true;
          newUser.username = data.username;
          newUser.email = data.email;
          setUser(newUser);
          history.replace(from);
        }
      })
    }
  };

  return (
    <div className="SignIn">
      <Card style={{ maxWidth: '600px', margin: '50px auto' }}>
        <Card.Body>
          <h4 className="text-center">Create New Account</h4>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {isNewUser &&
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="username" placeholder="Enter Full Name" ref={register({ required: true, minLength: 6, maxLength: 12 })} />
                {errors.username ? <span className="text-danger">name must be 6 to 12 caracters</span> : <span className="text-info">name must be 6 to 12 caracters</span>}
              </Form.Group>}
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="text" name="email" placeholder="Enter email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} />
              {errors.email ? <span className="text-danger">email must be valid</span> : <span className="text-info">email must be valid</span>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Enter Password" autoComplete="off" ref={register({ required: true, minLength: 8, pattern: /\d/ })} />
              {errors.password ? <span className="text-danger">password must be atleast 8 caracters & contain a number</span> : <span className="text-info">password must be atleast 8 caracters & contain a number</span>}
            </Form.Group>
            {isNewUser &&
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="conPassword" placeholder="Retype Password" autoComplete="off" ref={register({ required: true, validate: value => value === password.current || "The passwords do not match" })} />
                {errors.conPassword ? <span className="text-danger">password doesn't match !</span> : <span className="text-info">password & confirm password need to be same</span>}
              </Form.Group>}
            <Button variant="primary" type="submit">Submit</Button>

            <p className="text-center text-danger">{errorMsg}</p>

            {isNewUser ?
              <p className="text-center">already have an account? <span onClick={() => setIsNewUser(!isNewUser)} style={{ color: 'blue', cursor: 'pointer' }}>login</span></p> :
              <p className="text-center">don't have an account? <span onClick={() => setIsNewUser(!isNewUser)} style={{ color: 'blue', cursor: 'pointer' }}>sign up</span></p>
            }
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SignIn;
