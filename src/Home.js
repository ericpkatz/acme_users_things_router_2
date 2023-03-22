import React from 'react';
import { useSelector } from 'react-redux';

const Home = ()=> {
  const { users, things } = useSelector(state => state);
  return (
    <div>
      <h1>Home</h1>
      Welcome! We have { users.length } users and we have { things.length } things!
    </div>
  );
};

export default Home;
