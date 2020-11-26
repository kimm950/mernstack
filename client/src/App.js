import './App.css';
import { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [friends, setFriends] = useState([]);

  function addFriend() { 
    Axios.post('http://localhost:3001/addfriend', {
      name: name,
      age: age
    }).then((res) => {
      setFriends([...friends, { _id: res.data._id, name: name, age: age }])
    }).catch(() => {
      alert('OHHHH NOOOOO');
    });
  };

  function updateFriend(id) { 
    const newAge = prompt('enter New Age');
    Axios.put('http://localhost:3001/update', { newAge: newAge, id: id })
      .then(() => {
        setFriends(friends.map((friend) => {
          return friend._id === id ? {_id: id, name: friend.name, age: newAge} : friend
        })) 
      })
  }

  function deleteFriend(id) { 
    Axios.delete(`http://localhost:3001/remove/${id}`)
      .then(() => { 
        setFriends(friends.filter((friend) => {
          return friend._id !== id
        }))
      })
  }

  function getFriend() { 
    Axios.get('http://localhost:3001/read')
      .then((res) => { 
        setFriends(res.data)
      })
      .catch(() => { 
        console.log('ERR');
      })
  };

  useEffect(getFriend, []);

  return (
    <div className="App">
      <div className='inputs'>
        <input type='text'
          placeholder='friend name...'
          onChange={(evt) => { setName(evt.target.value) }}
        />
        <input type='number'
          placeholder='firend age'
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
              <button onClick={() => updateFriend(friend._id)}>Update</button>
              <button onClick={() => deleteFriend(friend._id)}>Delete</button>
          </div>
        )
        })}
    </ul>
    </div>
  );
}

export default App;
