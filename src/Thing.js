import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { destroyThing, updateThing } from './store';

const Thing = ()=> {
  const { id } = useParams();
  const { things, users } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [userId, setUserId] = useState('');
  const thing = things.find(thing => thing.id === id);

  useEffect(()=> {
    const thing = things.find(thing => thing.id === id);
    if(thing){
      console.log(thing);
      setName(thing.name);
      setRating(thing.rating);
      setUserId(thing.userId ? thing.userId : '');
    }
  }, [things]);

  if(!thing){
    return null;
  }
  const destroy = (thing)=> {
    dispatch(destroyThing(thing));
    navigate('/things');
  };

  const update = async(ev)=> {
    ev.preventDefault();
    try {
      const updated = { id, name, rating, userId };
      await dispatch(updateThing(updated));
      navigate('/things');
    }
    catch(ex){
      console.log(ex.response.data);
    }
  };
  return (
    <div>
      <h1>Thing { thing.name }</h1>
      <p>
        Add some details for things!
      </p>
      <form onSubmit={ update }>
        <input value={ name } onChange={ ev => setName(ev.target.value)}/>
        <select value={ rating } onChange={ ev => setRating(ev.target.value)}>
        {
          new Array(20).fill('').map((_, idx)=> {
            return (
              <option key={ idx }>{ idx + 1 }</option>
            );
          })
        }
        </select>
        <select value={ userId } onChange={ ev => setUserId(ev.target.value)}>
          <option value=''>Nobody</option>
          {
            users.map( user => {
              return (
                <option value={ user.id} key={ user.id }>{ user.name }</option>
              );
            })
          }
        </select>
        <button disabled={ name === thing.name && rating === thing.rating && userId === thing.userId}>Update</button>
      </form>
      <button onClick={ ()=> destroy(thing)}>x</button>
    </div>
  );
};

export default Thing;
