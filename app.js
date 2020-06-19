const path = require('path');
require('dotenv').config();
const { errors } = require('celebrate');
const cors = require('cors');
const mongoose = require('mongoose'); // Db
const bodyParser = require('body-parser'); // body parser
// Server
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
// routes
const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/team');
const taskRoutes = require('./routes/task');

const cookieParser = require('cookie-parser');

// connect db
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection db error'));
db.once('open', () => {
    console.log('db connected');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/team', teamRoutes);
app.use('/tasks', taskRoutes);

app.all('*', (req, res) => res.status(404).json({ message: 'Запрашиваемый ресурс не найден' }));
app.use(errors());
app.use((err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : 500;
    const message = statusCode === 500 ? 'Ошибка сервера': err.message;
    res.status(statusCode).send({ message: message });
});
server.listen(80);
