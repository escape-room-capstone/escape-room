import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import React from 'react';
import '../../public/CSS/Burger.css';

const _Burger = (props) => {
  return (
    <Menu>
      <span
        className="menu-item"
        onClick={() => {
          const result = confirm(
            'Are you sure? Leaving this page will result in losing all progress'
          );
          if (result) {
            props.history.push('/home');
          }
        }}
      >
        Home
      </span>

      <span
        onClick={() => {
          const result = confirm(
            'Are you sure? Leaving this page will result in losing all progress'
          );
          if (result) {
            props.history.push(`/users/${props.auth.id}/account`);
          }
        }}
        className="menu-item"
      >
        Profile
      </span>

      <span
        onClick={() => {
          const result = confirm(
            'Are you sure? Leaving this page will result in losing all progress'
          );
          if (result) {
            props.history.push('/home');
          }
        }}
        id="quit"
        className="menu-item"
        to=""
      >
        Quit
      </span>
    </Menu>
  );
};

export const Burger = connect((state) => state)(_Burger);
