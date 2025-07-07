// server/index.js
const express = require('express');
const cors = require('cors');
const plantRoutes = require('./routes/plantRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Allow JSON body
app.use('/api', plantRoutes); // Route prefix

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
