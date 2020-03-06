const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');

require('dotenv').config();




const app = express();

const PORT = process.env.PORT || 5000;

//connect to the database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log(`Database connected successfully`))
    .catch(err => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(PORT, console.log(`Server is listening on port ${PORT}`));