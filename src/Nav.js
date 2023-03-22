import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Nav = ()=> {
  const {users, things, count } = useSelector(state => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const view = location.pathname;
  return (
    <nav>
      <Link to='/' className={ view === '/' ? 'selected': ''}>Home</Link>
      <Link to='/users' className={ view === '/users' ? 'selected': ''}>Users ({ users.length })</Link>
      <Link to='/things' className={ view === '/things' ? 'selected': ''}>Things ({ things.length })</Link>
      <a onClick={ ()=> dispatch({ type: 'INC'}) }>{ count }</a>
    </nav>
  );
};

export default Nav;
