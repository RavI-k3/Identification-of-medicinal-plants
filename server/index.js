// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route for "Explore" functionality
app.get('/api/explore', (req, res) => {
  // Your prediction logic if any; example response:
  res.json({ message: 'Explore endpoint working!' });
});

app.post('/api/predict', (req, res) => {
  // If you want to run Python script
  const { spawn } = require('child_process');
  const py = spawn('python', ['predict.py', req.body.imagePath]);

  py.stdout.on('data', (data) => {
    res.json({ prediction: data.toString() });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
