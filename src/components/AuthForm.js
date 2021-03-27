import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const buttonTheme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: green[900],
    },
  },
});
//store method
import { authenticate } from '../store/auth';
const AuthForm = (props) => {
  const { name, displayName, error } = props;

  return (
    <div id="authForm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.authenticate(
            e.target.email.value,
            e.target.password.value,
            name
          );
        }}
        name={name}
      >
        <div>
          <TextField label="Email" margin="normal" name="email" type="text" />
          <label htmlFor="email">
            <small>Email</small>
          </label>{' '}
        </div>
        <div>
          <TextField label="Password" name="password" type="password" />
          <label htmlFor="password">
            <small>Password</small>
          </label>
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
            {' '}
            {error.response.data}{' '}
          </div>
        )}
      </form>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    authenticate: (email, password, formName) =>
      dispatch(authenticate(email, password, formName)),
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
