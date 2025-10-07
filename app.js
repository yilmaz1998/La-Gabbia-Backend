require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const ordersRouter = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const menuRouter = require('./routes/menu');

const app = express();

app.use(express.json());
app.use(cors());


const PORT = process.env.PORT

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
  
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  app.use('/orders', ordersRouter(io));
  app.use('/admin', adminRoutes);
  app.use('/menu', menuRouter)


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

module.exports = app;