var express = require("express");
var app = express();
var port = 4000;
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Dynamically handle origins
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        callback(null, true); // Allow all origins for testing purposes
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow credentials like cookies
}));

app.use(express.json());
app.use(cookieParser());
require('./Connection/conn');

const AuthRoutes = require('./Routes/user');
const VideoRoutes = require('./Routes/video');
const CommentRoutes = require('./Routes/comment');

app.use('/auth', AuthRoutes);
app.use('/api', VideoRoutes);
app.use('/commentApi', CommentRoutes);

app.listen(port, () => {
    console.log("Our backend project is running on Port 4000");
});
