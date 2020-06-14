const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./config/db');
const app = express();

// Routes
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Connect Database
connectDb();

// Body Parser ( Parses the text as JSON and exposes the resulting object on req.body. )
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API is running'));

// Define Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
