import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createThing, updateThing, destroyThing } from './store';
import { Link } from 'react-router-dom';

const Things = ()=> {
  const { things } = useSelector(state => state);
  const dispatch = useDispatch();
  const [name, setName ] = useState('');
  const [ errors, setErrors ] = useState([]);

  const create = async(ev)=> {
    ev.preventDefault();
    try {
      await dispatch(createThing({ name }));
      setName('');
      setErrors([]);
    }
    catch(ex){
      setErrors(ex.response.data.error.errors);
    }
  };

  const destroy = (thing)=> {
    dispatch(destroyThing(thing));
  };
  
  const increment = (thing)=> {
    thing.rating++;
    dispatch(updateThing(thing));
  };

  return (
    <div>
      <h1>Things</h1>
      <form onSubmit={ create }>
        <input value={ name } onChange={ ev => setName(ev.target.value)} placeholder='name for thing'/>
        <button disabled={ !name }>Create</button>
        <ul>
          {
            errors.map( (error, idx) => {
              return (
                <li key={ idx }>
                  { error.message }
                </li>
              );
            })
          }
        </ul>
      </form>
      <ul>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                <Link to={`/things/${thing.id}`}>{ thing.name }</Link> ({ thing.rating})
                <button onClick={ ev => destroy(thing)}>x</button>
                <button onClick={ ()=> increment(thing)}>+</button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Things;
