import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { destroyThing, updateThing } from './store';

const Thing = ()=> {
  const { id } = useParams();
  const { things } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const thing = things.find(thing => thing.id === id);

  useEffect(()=> {
    const thing = things.find(thing => thing.id === id);
    if(thing){
      setName(thing.name);
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
      const updated = { id, name };
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
        <button disabled={ name === thing.name }>Update</button>
      </form>
      <button onClick={ ()=> destroy(thing)}>x</button>
    </div>
  );
};

export default Thing;
