import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Navbar } from './Navbar';

import { getUserByToken } from '../store/auth';
import '../../public/CSS/Authform.css';

const buttonTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});
//store method
import { authenticate } from '../store/auth';
//check localStorage for a TOKEN - if token, that means we stil have a session for a user,
//so we should find the user by Token and set user in state
const AuthForm = (props) => {
  const { name, displayName, error } = props;
  useEffect(() => {
    const checkForUser = async () => {
      const token = window.localStorage.getItem('token');
      if (token) {
        await props.setUser();
      }
    };
    checkForUser();
  }, []);
  return (
    <>
      <div id="authForm">
        <Navbar />

        <form
          onSubmit={(e) => {
            e.preventDefault();

            let firstName = e.target.firstName
              ? e.target.firstName.value
              : null;
            let lastName = e.target.lastName ? e.target.lastName.value : null;

            props.authenticate(
              firstName,
              lastName,
              e.target.email.value,
              e.target.password.value,
              name
            );
          }}
          name={name}
        >
          {' '}
          {displayName === 'Sign Up' ? (
            <div>
              <div>
                <TextField
                  label="First Name"
                  margin="normal"
                  name="firstName"
                  type="text"
                />
              </div>
              <div>
                <TextField
                  label="Last Name"
                  margin="normal"
                  name="lastName"
                  type="text"
                />
              </div>
            </div>
          ) : (
            ''
          )}
          <div>
            <TextField label="Email" margin="normal" name="email" type="text" />
          </div>
          <div>
            <TextField label="Password" name="password" type="password" />
          </div>
          <div>
            <ThemeProvider theme={buttonTheme}>
              <Button type="submit" variant="contained" color="primary">
                {displayName}
              </Button>
            </ThemeProvider>
          </div>
          {error && error.response && (
            <div style={{ color: 'red', fontStyle: 'italic', margin: '1rem' }}>
              {error.response.data}
            </div>
          )}
        </form>
        {props.isLoggedIn && props.history.push('/home')}
      </div>
    </>
  );
};

const mapLogin = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    authenticate: (firstName, lastName, email, password, formName) =>
      dispatch(
        authenticate(firstName, lastName, email, password, formName, history)
      ),
    setUser: () => dispatch(getUserByToken()),
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
