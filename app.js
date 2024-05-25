const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors=require('cors');
const userRoutes = require('./routes/userRoute');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', userRoutes);

module.exports=app;




