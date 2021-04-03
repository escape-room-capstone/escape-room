import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../../public/CSS/CreateTheme.css';

const _CreateTheme = (props) => {
  const [data, setData] = useState({});
  const uploadHandler = async (e) => {
    setData(e.target.files[0]);
    // const formData = new FormData();
    // console.log(e.target.files[0], 'e.target.files[0]');
    // formData.append('file', e.target.files[0]);
    // console.log(formData, 'form data');
  };
  //   const handleFormSubmit = async (e) => {
  //     e.preventDefault();
  //     const config = {
  //       headers: {
  //         'content-type': 'multipart/form-data',
  //       },
  //     };
  //     const formData = new FormData();
  //     formData.append('file', data);
  //     const config = { headers: { 'content-type': 'multipart/form-data' } };
  //     await axios.post('/api/upload', formData, config);
  //   };
  return (
    <div id="create-theme">
      <h1>Create Theme</h1>
      <form
        action={`/api/users/${props.auth.id}/themes`}
        encType="multipart/form-data"
        method="POST"
      >
        <input
          name="theme"
          type="text"
          placeholder="enter a theme name"
        ></input>
        <input
          //   onChange={(e) => uploadHandler(e)}
          className="theme"
          name="images"
          type="file"
          multiple="multiple"
        ></input>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export const CreateTheme = connect((state) => state)(_CreateTheme);
