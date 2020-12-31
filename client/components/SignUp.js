import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Alert, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { loginSuccess } from '../redux/authActions';
// import { createUser } from '../redux/userActions';
import { useHistory } from 'react-router-dom';
import apiKey from '../../config';

import { manualLoginSuccess, manualLogoutSuccess } from '../redux/authActions';

const SignupPage = props => {
  const dispatch = useDispatch();
  //google Signup via Google Login
  const onSuccess = googleUser => {
    console.log(googleUser);
    dispatch(loginSuccess(googleUser));
  }
  const onFailure = error => {
    console.log(error)
  }
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [home, setHome] = useState('');
  // const [access, setAccess] = useState('');
  const access = false;

  const history = useHistory();

  const handleClick = async () => {
    //get whatever data we need before sending to database
    const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(home) + '&key=' + apiKey);
    const data = await response.json();
    console.log("this is your data from home zipcode", data);
    //set "home" from zipcode entered to geocode city name
    home = data.results[0].address_components[2].long_name;
    
    createUser(
      {
        email: email,
        password: password,
        city: home,
        access: access,
      }
    );
    //if signup is successful, we should automatically sign in the user, then redirect to dashboard
    //if signup is unsuccessful for any reason, stay on page
    // for now, pretend we're successful
    // history.push("/login")
  }

  return (
    <Container>
      <Row>
        <Col>
          <Alert variant="info">
            <h1>Welcome to Citizen Report!</h1>
            <hr />
            <h6>Please register below to begin submitting complaints.</h6>
            <div>
              <Form className="needs-validation">
                <Form.Group controlId="formEmail">
                  <Form.Label>Email Address:</Form.Label>
                  <Form.Control type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="text" placeholder="Keep it secret, keep it safe" value={password} onChange={(event) => setPassword(event.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formHome">
                  <Form.Label>Home:</Form.Label>
                  <Form.Control type="text" placeholder="Zipcode" value={home} onChange={(event) => setHome(event.target.value)} />
                </Form.Group>
                {/* <Form>
                  {['checkbox'].map((type) => (
                    <div key={type} className="mb-3">
                      <Form.Check type={type} id={`check-api-${type}`}>
                        <Form.Check.Input type={type} isValid />
                        <Form.Check.Label>{`Custom api ${type}`}</Form.Check.Label>
                        <Form.Check.Feedback type="valid">You did it!</Form.Check.Feedback>
                      </Form.Check>
                    </div>
                  ))}
                </Form> */}
                {/* Preferred City/Home
                    Checkbox for access boolean, "City Official" */}
                <div className="d-flex justify-content-between">
                  <Button onClick={() => {
                    handleClick();
                  }}>Create Account</Button>
                  <GoogleLogin clientId="591081752316-fisf1og4etovgh35bcg1l99kdo5bgd2r.apps.googleusercontent.com"
                  buttonText="Continue with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  />
                </div>
              </Form>
            <hr />
            </div>
            <hr />
            <div>
              <h5>Already registered?</h5>
              <Button onClick={() => {
                // redirect to Registration
                history.push("/login")
              }}>Log In Page</Button>
            </div>
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}

export default SignupPage;