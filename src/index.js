import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import Things from './Things';
import Thing from './Thing';
import Nav from './Nav';
import store, { fetchUsers, fetchThings} from './store';

const App = ()=> {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(fetchUsers());
    dispatch(fetchThings());
  }, []);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/users' element={ <Users />} />
        <Route path='/things' element={ <Things />} />
        <Route path='/things/:id' element={ <Thing />} />
      </Routes>
    </div>
  );
};


const root = createRoot(document.querySelector('#root'));
root.render(
  <Provider store={ store }>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>);
