const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const FriendModel = require('./models/friends.ts');

// Necessary for devloping multiple app together
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  { useNewUrlParser: true }
);

// Create friend
app.post('/addfriend', async (req, res,) => {
  const name = req.body.name
  const age = req.body.age

  const friend = new FriendModel({ name: name, age: age });
  await friend.save();
  // Send response data to make newly added friend updatable
  res.send(friend)
});

// Get(read) friend
app.get('/read', async (req, res,) => {
  await FriendModel.find({}, (err, result) => { 
    if (err) {
      res.send(err);
    } else { 
      res.send(result)
    }
  })
});

// Update Age
app.put('/update', async (req, res) => { 
  const newAge = req.body.newAge
  const id = req.body.id
  try {
    await FriendModel.findById(id, (error, friendToUpdate) => {
      // To make sure the age is in number type
      friendToUpdate.age = parseInt(newAge);
      friendToUpdate.save();
    })
  } catch (err) { 
    console.log(err)
  }
  res.send('UPDATED')
})

// Remove freind
app.delete('/remove/:id', async (req, res) => { 
  const id = req.params.id
  // Find id then remove
  await FriendModel.findByIdAndRemove(id).exec()
  res.send('DELETED')
})

const port = 3001;
app.listen(port, () => {
  console.log(`You are conncted in port ${port}`)
});