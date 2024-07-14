const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();// Express app
const server = http.createServer(app); // HTTP server
const io = new Server(server); // Socket.io server

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.resolve('./public')));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));

// Routes
const userRoutes = require('./src/routes/UserRoutes');
const productRoutes = require('./src/routes/ProductRoutes');
const cartRoutes = require('./src/routes/CartRoutes');
const uploadRoutes = require('./src/routes/UploadRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/upload', uploadRoutes);

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', (socket) => {
    console.log('User connected to socket...',socket.id);
    socket.on('message',(data)=>{
        console.log(data);
        //io.emit('message',data);
        //io.emit('recive-message',data);
        socket.broadcast.emit('recive-message',data);
    })
    
});


mongoose.connect('mongodb://127.0.0.1:27017/node_backup')
    .then(() => {
        console.log('Connected to database...');
    })
    .catch((err) => {
        console.log('Error connecting to database...', err);
    });

const PORT = 3000;
server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
