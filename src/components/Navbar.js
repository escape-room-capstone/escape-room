import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth';
import { connect } from 'react-redux';
import '../../public/CSS/Navbar.css';

const _Navbar = (props) => {
  return (
    <div id="navbar">
      {props.auth.id && (
        <div className="navbar-row">
          <div>
            <span id="welcome">Hello, {props.auth.email}!</span>
          </div>
          <div>
            <Link to="/choosetheme">
              <span>CREATE</span>
            </Link>
            <Link to={`/users/${props.auth.id}/account`}>
              <span>ACCOUNT</span>
            </Link>

            <span onClick={() => props.logout()}>LOGOUT</span>
          </div>
        </div>
      )}
      {!props.auth.id && (
        <div className="navbar-row">
          <div></div>
          <div>
            <Link to="/login">
              <span>LOGIN</span>
            </Link>
            <Link to="/signup">
              <span>SIGN UP</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export const Navbar = connect((state) => state, mapDispatch)(_Navbar);
