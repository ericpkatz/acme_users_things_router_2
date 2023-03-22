import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const countReducer = (state = 0, action)=> {
  if(action.type === 'INC'){
    state++;
    return state;
  }
  return state;
};

const thingsReducer = (state = [], action)=> {
  if(action.type === 'SET_THINGS'){
    return action.things; 
  }
  if(action.type === 'CREATE_THING'){
    return [...state, action.thing ]; 
  }
  if(action.type === 'UPDATE_THING'){
    return state.map(thing => {
      if(thing.id === action.thing.id){
        return action.thing;
      }
      return thing;
    }); 
  }
  if(action.type === 'DESTROY_THING'){
    return state.filter(_thing => _thing.id !== action.thing.id );
  }
  return state;
};

const usersReducer = (state = [], action)=> {
  if(action.type === 'SET_USERS'){
    return action.users; 
  }
  if(action.type === 'DESTROY_USER'){
    return state.filter(user => user.id !== action.user.id); 
  }
  return state;
};

const reducer = combineReducers({
  users: usersReducer,
  things: thingsReducer,
  count: countReducer
});

export const fetchThings = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/things');
    dispatch({ type: 'SET_THINGS', things: response.data });
  }
}

export const fetchUsers = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/users');
    dispatch({ type: 'SET_USERS', users: response.data });
  };
};

export const createThing = (thing)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/things', thing);
    dispatch({ type: 'CREATE_THING', thing: response.data });
  };
};

export const destroyThing = (thing)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/things/${thing.id}`);
    dispatch({ type: 'DESTROY_THING', thing });
  };
};

export const destroyUser = (user)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/users/${user.id}`);
    dispatch({ type: 'DESTROY_USER', user });
  };
};

export const updateThing = (thing)=> {
  return async(dispatch)=> {
    const response = await axios.put(`/api/things/${thing.id}`, thing); 
    dispatch({ type: 'UPDATE_THING', thing: response.data });
  };
};


const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
