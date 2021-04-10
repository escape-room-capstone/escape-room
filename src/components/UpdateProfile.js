import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar } from './Navbar';
import { getUserByToken } from '../store/auth';
import { setUser, fetchUsers, updateProfile } from '../store/users';
import '../../public/CSS/Account.css';
import TextField from '@material-ui/core/TextField';

const UpdateProfile = (props) => {
  

  
  const [userInfo, setUserInfo] = useState({
    firstName: "", 
    lastName: "", 
    phoneNumber: "",
    birthdate: "",
    email: ""
  });

  useEffect(() => {

    setUserInfo({
      firstName: props.auth.firstName, 
      lastName: props.auth.lastName, 
      phoneNumber: props.auth.phoneNumber,
      birthdate: props.auth.birthdate,
      email: props.auth.email
    })
  }, [props.auth])

  const paramsID = props.match.params.id;
  console.log('paramsID', paramsID);

  useEffect(() => {
    const checkToken = async () => {
      const token = window.localStorage.getItem('token');
      if (token) {
        await props.setUser();
      }
    };
    checkToken();
  }, []);
  

  const onChange = (e) => {
    let targetName = e.target.name;
    setUserInfo((prevInfo) => {
      return { ...prevInfo, [targetName]: e.target.value };
    });
  };
  

  const onSubmit = async(e) => {    
    e.preventDefault();

    await props.updateProfile(
      props.auth.id,
      userInfo.firstName,
      userInfo.lastName,
      userInfo.phoneNumber,
      userInfo.birthdate,
      userInfo.email
    );

    props.history.push(`/users/${props.auth.id}/account`);
  };
  

  return (
    <div id="account">
      <Navbar />
      <form id="accountDiv" onSubmit={(e) => onSubmit(e)}>
        <div>
          {' '}
          <TextField
            onChange={(e) => onChange(e)}
            type="text"
            name="firstName"
            value={userInfo.firstName}
            label="First Name"
            id="standard-basic"
            variant="outlined"
          ></TextField>
        </div>

        <div>
          {' '}
          <TextField
            onChange={(e) => onChange(e)}
            type="text"
            name="lastName"
            value={userInfo.lastName}
            label="Last Name"
            id="standard-basic"
            variant="outlined"
          ></TextField>
        </div>

        <div>
          {' '}
          <TextField
            onChange={(e) => onChange(e)}
            type="text"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            label="Phone Number"
            id="standard-basic"
            variant="outlined"
          ></TextField>
        </div>

        <div>
          {' '}
          <TextField
            onChange={(e) => onChange(e)}
            type="text"
            name="birthdate"
            value={userInfo.birthdate}
            label="Date of Birth"
            id="standard-basic"
            variant="outlined"
          ></TextField>
        </div>

        <div>
          {' '}
          <TextField
            onChange={(e) => onChange(e)}
            type="text"
            name="email"
            value={userInfo.email}
            label="Email"
            id="standard-basic"
            variant="outlined"
          ></TextField>
        </div>

        <button onClick={(e)=>onSubmit(e)} id="accountButton">SAVE CHANGES</button>
      </form>
    </div>
  );
};

const mapToState = (state) => {  
  return state;
};

const mapToDispatch = {
  setUser: getUserByToken,
  fetchUsers: fetchUsers,
  getUser: setUser,
  updateProfile: updateProfile,
};

export default connect(mapToState, mapToDispatch)(UpdateProfile);
