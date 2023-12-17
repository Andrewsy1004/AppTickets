import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import {socketController} from './sockets/controller.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new SocketIOServer(server);

io.on('connection', socketController);


server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
