// In db-crud folder not in src, Create with name server1.js
//npm install mongoose
//first terminal: node server1.js
//for CRUD Operations: in another terminal
//Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/users" -ContentType "application/json" -Body '{"name": "Alia", "email": "Alain@example.com", "age": 30}'
//Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/users" -ContentType "application/json" -Body '{"name": "Alex", "email": "john@yahoo.com", "age": 35}' 
//Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/users"
//Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/users/65cb829decab01d45546620b" (65cb829decab01d45546620b--userID in DB)
//Invoke-RestMethod -Method Put -Uri "http://localhost:5000/api/users/65cb829decab01d45546620b" -ContentType "application/json" -Body '{"name": "Siri", "email": "siri@in.com", "age": 25}'  
//Invoke-RestMethod -Method Delete -Uri "http://localhost:5000/api/users/65cb821aecab01d455466209"


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/safidatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
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

// Create a user
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

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get a user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update a user
app.put('/api/users/:id', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, age }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
