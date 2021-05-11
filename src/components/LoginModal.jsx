import React, { useState } from 'react';
import axios from 'axios';
import {
  Modal,
  Button,
  Form,
  Divider,
  Grid,
  Segment,
  Header,
  Menu,
} from 'semantic-ui-react';

const LoginModal = (props) => {
  const [visibility, setVisibility] = useState(false);

  const registerUser = async (event) => {
    event.preventDefault();
    let credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirmation: event.target.passwordConfirmation.value,
    };

    try {
      let response = await axios.post('/auth/', credentials);
      const userCredentials = {
        uid: response.headers['uid'],
        client: response.headers['client'],
        access_token: response.headers['access-token'],
        expiry: response.headers['expiry'],
        token_type: 'Bearer',
      };
      localStorage.setItem('userData', JSON.stringify(userCredentials));
      props.setUpdate(true);
      setVisibility(false);
			props.setAuthenticated(true)
    } catch (error) {
      console.log(error);
    }
  };

  const logInUser = async (event) => {
    event.preventDefault();
    let credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      let response = await axios.post('/auth/sign_in', credentials);
      const userCredentials = {
        uid: response.headers['uid'],
        client: response.headers['client'],
        access_token: response.headers['access-token'],
        expiry: response.headers['expiry'],
        token_type: 'Bearer',
      };
      localStorage.setItem('userData', JSON.stringify(userCredentials));
      props.setUpdate(true);
      setVisibility(false);
			props.setAuthenticated(true)
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <Menu inverted>      
      <Modal
        centered={false}
        open={visibility}
        onClose={() => setVisibility(false)}
        onOpen={() => setVisibility(true)}
        trigger={
          <Menu.Item position='left'>
            <Button data-cy='login-btn' color='red' inverted>
              Login/Register
            </Button>
          </Menu.Item>
        }>
        <Modal.Header data-cy='login-modal-header'></Modal.Header>
        <Modal.Content data-cy='login-modal-content'>
          <Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>
              <Divider vertical>Or</Divider>
              <Grid.Row verticalAlign='middle'>
                <Grid.Column>
                  <Header as='h3'>Login</Header>
                  <Form onSubmit={(event) => logInUser(event)}>
                    <Form.Field widths={2}>
                      <Form.Input
                        fluid
                        type='email'
                        label='email'
                        name='email'
                        placeholder='email'
                        data-cy='login-email-input'
                        required
                      />
                      <Form.Input
                        fluid
                        type='password'
                        label='Password'
                        name='password'
                        placeholder='Password'
                        data-cy='login-password'
                        required
                      />
                    </Form.Field>
                    <Button type='submit' data-cy='form-login-btn'>
                      Login
                    </Button>
                  </Form>
                </Grid.Column>
                <Grid.Column>
                  <Header>Register</Header>
                  <Form onSubmit={(event) => registerUser(event)}>
                    <Form.Field widths='equal'>
                      <Form.Input
                        fluid
                        type='email'
                        label='email'
                        name='email'
                        placeholder='email'
                        data-cy='registration-email-input'
                        required
                      />
                      <Form.Input
                        fluid
                        type='password'
                        label='Password'
                        name='password'
                        placeholder='Password'
                        data-cy='registration-password'
                        required
                      />
                      <Form.Input
                        fluid
                        type='password'
                        label='Password'
                        name='passwordConfirmation'
                        placeholder='Confirm Password'
                        data-cy='registration-confirmation-password'
                        required
                      />
                    </Form.Field>
                    <Button type='submit' data-cy='form-register-btn'>
                      Register
                    </Button>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setVisibility(false)}>Close</Button>
        </Modal.Actions>
      </Modal>
    </Menu>
  );
};

export default LoginModal;
