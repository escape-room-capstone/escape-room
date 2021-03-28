import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import { getUserByToken } from '../store/auth';

const buttonTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[900],
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
      console.log(token, 'token');
      if (token) {
        await props.setUser();
      }
    };
    checkForUser();
  }, []);
  console.log(props.isLoggedIn, 'props.isloggedin');
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
          {/* <label htmlFor="email">
            <small>Email</small>
          </label>{' '} */}
        </div>
        <div>
          <TextField label="Password" name="password" type="password" />
          {/* <label htmlFor="password">
            <small>Password</small>
          </label> */}
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
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    authenticate: (email, password, formName) =>
      dispatch(authenticate(email, password, formName, history)),
    setUser: () => dispatch(getUserByToken()),
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
