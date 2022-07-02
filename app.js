require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongo');
const PORT = process.env.PORT || 5000;

//Allow any origin to access the API
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
console.log(__dirname);
app.use(bodyParser.json());
connectDB();
app.use('/api/v1', require('./routes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
