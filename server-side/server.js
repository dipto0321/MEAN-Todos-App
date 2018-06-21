const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoDB = require('mongoose');
const appRoutes = require('./routes/appRoutes');

const port = process.env.PORT || 4000;
const app = express();

//App Configurations

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', appRoutes);

//Database Config

mongoDB.connect('mongodb://Admin:admin@ds119490.mlab.com:19490/todosappv1');

//Create & Run New Server
http.createServer(app).listen(port, () => {
    console.log(`Server running at ${port}`);
});
