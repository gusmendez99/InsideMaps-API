const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');

//.env config
require('dotenv').config()


//API
const API_VERSION = '/api/v1';

// Express APIs
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const mapRouter = require('./routes/maps.routes')
const markerRouter = require('./routes/markers.routes');

// MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected')
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);


// Express settings
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// Serve static resources
app.use('/public', express.static('public'));

app.use(API_VERSION, authRouter)
app.use(API_VERSION, userRouter)
app.use(API_VERSION, mapRouter)
app.use(API_VERSION, markerRouter)

// Define PORT
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});