import React, { useRef } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { connect, useSelector, useDispatch } from 'react-redux';

const SignUp = () => {

  return (
    <div>
      <form id='signup-form'>
          <label>Email</label>
          <input type='email' className='form-input'></input>
          <label>Password</label>
          <input type='text' className='form-input'></input>
          <label>Password Confirmation</label>
          <input type='text' className='form-input'></input>
      </form>
      <div>
        Already have an account? Log in!
      </div>
    </div>
  );
}

export default SignUp;