const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://chauhanluckey4:Luckey%409289@cluster0.u5hpc.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define schema
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Create model
const Form = mongoose.model('Form', formSchema);

// API endpoint
app.post('/api/form', async (req, res) => {
  const { name, email } = req.body;
  const newForm = new Form({ name, email });
  try {
    await newForm.save();
    res.status(201).send('Form submitted successfully');
  } catch (error) {
    res.status(500).send('Error submitting form');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
