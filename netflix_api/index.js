const express = require('express')  // import express
const app = express() // initialize express
const port = 3000 // setting the port
const mongoose = require('mongoose');
const { Schema } = mongoose; // Grab the schema object from mongoose


mongoose.connect('paste mongo db data', 
{
  useCreateIndex: true,
  useNewUrlParser: true,
  useNewUrlParser: true
});

// netflix-user
// 0GZVr9ZyvWfv4gA6

const User = mongoose.model('Users', new Schema(
  { 
    name: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }
));



app.use(express.json());

// using the get method
// LOGIC for the Get Request
// I'm trying to get data
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  const newUser = new User ({
    name: "Max",
    email: "1231423213@gmail.com",
    password: "123456789"
  })
  res.send('registered');

  newUser.save((err, user) => {
    console.log("All works");
    console.log(user);
    console.log("registered");
  })
})


app.post('/login', (req, res) => {
  const password  = req.body.password;
  const email = req.body.email;
  const validUser = {
    email:"max@gmail.com",
    password: "1234"
  }

  if (email == validUser.email && password == validUser.password) {
    res.send ({
      status: "valid"
    })
  }  else {
    res.status(404).send("Sorry can't find that!")
    }
  console.log(req.body);  
  res.send('Valid')
})


// start our app
// listening to the port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})