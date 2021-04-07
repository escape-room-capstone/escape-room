import React, { useEffect, useState } from 'react';
import { fetchThemes } from '../../store/theme';
import { fetchTheme } from '../../store/singleTheme';
import { connect } from 'react-redux';
import '../../../public/CSS/ChooseTheme.css';
import { Link } from 'react-router-dom';
import { getUserByToken } from '../../store/auth';
import { Navbar } from '../Navbar';

const ChooseTheme = (props) => {
  useEffect(() => {
    async function getData() {
      await props.getThemes();
    }
    getData();
  }, []);
  useEffect(() => {
    async function getUser() {
      await props.getUser();
    }
    getUser();
  }, []);
  const themes = props.themes.filter((theme) => theme.userId === null);
  console.log(themes, 'themes');
  //default themes will be theme with type of default
  const defaultThemes = themes.filter((theme) => theme.type === 'default');
  console.log(props.auth.id, 'props auth id');
  const userThemes = props.themes.filter(
    (theme) => theme.userId === props.auth.id
  );
  console.log(userThemes, 'userThemes');
  if (props.auth.id) {
    return (
      <div id="columnDiv">
        <Navbar />
        <div className="themeSection">
          <h1 style={{ textAlign: 'center' }}>Choose A Theme</h1>
          <h2 id="heading-with-button">
            Themes You've Created
            <Link to={`/users/${props.auth.id}/createTheme`}>
              <button id="createButton">+ CREATE THEME</button>
            </Link>
          </h2>
          <div className="choose-theme">
            {userThemes.map((theme) => (
              <div className="themeMap" key={theme.id}>
                <h2> {theme.name} </h2>
                <Link to={`/theme/${theme.id}`}>
                  <img
                    // className="createGameImg"
                    src={theme.backgroundImageOne}
                    alt="theme background image"
                  />
                </Link>
              </div>
            ))}
          </div>
          <h2> Default Themes</h2>
          <div className="choose-theme">
            {themes.map((theme) => (
              <div className="themeMap" key={theme.id}>
                <h2> {theme.name} </h2>
                <a>
                  <img
                    // className="createGameImg"
                    onClick={() => props.history.push(`/theme/${theme.id}`)}
                    src={theme.backgroundImageOne}
                    alt="theme background image"
                  ></img>
                </a>
              </div>
            ))}
          </div>
        </div>
        {/*  Designed by VARKS */}
      </div>
    );
  } else {
    return null;
  }
};

const mapState = (state) => state;

const mapDispatch = {
  getThemes: fetchThemes,
  setTheme: fetchTheme,
  getUser: getUserByToken,
};

export default connect(mapState, mapDispatch)(ChooseTheme);
