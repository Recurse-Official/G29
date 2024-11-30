import express from 'express';
import http from 'http';
import { Server as socketIo } from 'socket.io';
import Redis from 'ioredis';
import bodyParser from 'body-parser';
import cors from 'cors';
import publicRoutes from './routes/publicRoute.js'; 
import setterRoutes from './routes/setterRoute.js'
import studentRoutes from './routes/studentRoute.js'
import connectDB from './config/db.js';

const redisClient = new Redis();
const app = express();
const server = http.createServer(app);
const io = new socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
connectDB();
app.use('/student',studentRoutes)
app.use('/api', publicRoutes); 
app.use('/setter',setterRoutes)

io.on('connection', (socket) => {
  console.log('A user connected');


  redisClient.lrange('queue', 0, -1, (err, queueData) => {
    if (err) {
      console.error('Error fetching queue data from Redis:', err);
    } else {
      const parsedQueue = queueData.map((item) => JSON.parse(item));
      socket.emit('queueData', parsedQueue); 
    }
  });

 
  socket.on('newQueueItem', (newItem) => {
    redisClient.rpush('queue', JSON.stringify(newItem), (err) => {
      if (err) {
        console.error("Error pushing to Redis:", err);
      } else {
        console.log("New item pushed to queue:", newItem);
        io.emit('newQueueItem', newItem); 
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

//ADDING EXCEPTION ROUTE 

app.post('/api2/submit', (req, res) => {
  const { publicKey, enrollmentId, questionId, chosenOption, signature, isverified } = req.body;
  const newItem = { publicKey, enrollmentId, questionId, chosenOption, signature, isverified };

  redisClient.rpush('queue', JSON.stringify(newItem), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error pushing to Redis' });
    }
    console.log("New item pushed to queue:", newItem);
    io.emit('newQueueItem', newItem);  
    res.status(200).json({ message: 'Item added to the queue' });
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});