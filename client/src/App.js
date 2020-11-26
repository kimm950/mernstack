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
    }).then(() => {
      alert('yay it works@!!!');
      getFriend()
    }).catch(() => {
      alert('OHHHH NOOOOO');
    });
  };

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
      <ul>
        {friends.map((friend, id) => {
          return(
            <li key={id}>
              {friend.name}
              {friend.age}
            </li>
        )
        })}
    </ul>
    </div>
  );
}

export default App;
