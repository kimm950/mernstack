import './App.css';
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import logo from './asset/mern.png'

interface IFriend { 
  _id: number,
  name: string,
  age: string | number | null,
}

export default function App() {

  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number | string>(0);
  const [friends, setFriends] = useState<IFriend[]>([]);

  const endpoint = 'https://mern-baby.herokuapp.com'

  function addFriend() { 
    Axios.post(`${endpoint}/addfriend`, {
      name: name,
      age: age
    }).then((res) => {
      setFriends([...friends, { _id: res.data._id, name: name, age: age }])
    }).catch(() => {
      alert('OHHHH NOOOOO');
    });
  };

  function updateFriend(id: number): void { 
    const newAge = prompt('enter New Age');
    Axios.put(`${endpoint}/update`, { newAge: newAge, id: id })
      .then(() => {
        setFriends(friends.map((friend) => {
          return friend._id === id ? {_id: id, name: friend.name, age: newAge} : friend
        })) 
      })
  }

  function deleteFriend(id: number) { 
    Axios.delete(`${endpoint}/remove/${id}`)
      .then(() => { 
        setFriends(friends.filter((friend) => {
          return friend._id !== id
        }))
      })
  }

  function getFriend() { 
    Axios.get(`${endpoint}/read`)
      .then((res) => { 
        setFriends(res.data)
      })
      .catch(() => { 
        console.log('ERR');
      })
  };

  useEffect(getFriend, []);
  useEffect(() => { 
    const reRender = setInterval(() => getFriend(), 5000);    
    return () => clearInterval(reRender);
  }, [])

  return (
    <div className="App">
      <div className='inputs'>
        <input type='text'
          placeholder='Friend name...'
          onChange={(evt) => { setName(evt.target.value) }}
        />
        <input type='number'
          placeholder='Friend age'
          onChange={(evt) => { setAge(evt.target.value) }}
        />

        <button onClick={addFriend}>Add Friend</button>
      </div>
      <ul className='friend-list'>
        {friends && friends.map((friend, _id) => {
          return (
            <div className='friend-group'>
              <li
                key={_id}
                className='friend-item'
              >
              <h3>Name: {friend.name}</h3>
              <h3>Age: {friend.age}</h3>
              </li>
              <button className='update-button' onClick={() => updateFriend(friend._id)}>✎</button>
              <button className='delete-button' onClick={() => deleteFriend(friend._id)}>⌫</button>
            </div>
        )
        })}
          <img src={logo} alt="logo" />
      </ul>
      <a href='https://github.com/kimm950' target='blank'>
        <button className='profile-button'>About me</button>
      </a>
    </div>
  );
}
