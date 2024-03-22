// Create in DBSchema folder not in src with name server.js
//npm install mongoose
//node server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/DataBase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());

// Insert static rows
const staticUsers = [
  { name: 'Safileen', email: 'safileen@gmail.com', age: 20 },
  { name: 'Safileen', email: '21bq1a42g3@vvit.net', age: 20 },
];

User.insertMany(staticUsers)
  .then(() => console.log('Documents inserted successfully...'))
  .catch(err => console.error('Error inserting static rows: ', err));

  
// API routes
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});