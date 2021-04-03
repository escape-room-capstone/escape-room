import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../../public/CSS/CreateTheme.css';

const _CreateTheme = (props) => {
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
