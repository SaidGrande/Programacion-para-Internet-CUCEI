import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

dotenv.config();

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

const db = createClient({
    url: "libsql://obliging-spitfire-ingsaidg.turso.io",
    authToken: process.env.DB_TOKEN
});

// Inicialización de la base de datos
await db.execute(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    user TEXT
)`);

io.on('connection', async (socket) => {
    console.log('A user has connected! ID:', socket.id);

    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });

    socket.on('chat message', async (msg) => {
        let result;
        const user = socket.handshake.auth.username ?? 'anonymous'; // Usar 'user' aquí
        try {
            result = await db.execute({
                sql: 'INSERT INTO messages (content, user) VALUES (:msg, :username)',
                args: { msg, username: user } // Corregido a 'username: user'
            });
            console.log(`Message saved: ${msg} with ID: ${result.lastInsertRowid}`);
        } catch (e) {
            console.error(e);
            return;
        }
        io.emit('chat message', msg, result.lastInsertRowid.toString(), user);
    });

    if (!socket.recovered) {
        try {
            const results = await db.execute({
                sql: 'SELECT id, content, user FROM messages WHERE id > ?',
                args: [socket.handshake.auth.serverOffset ?? 0]
            });
            results.rows.forEach(row => {
                socket.emit('chat message', row.content, row.id.toString(), row.user);
            });
        } catch (e) {
            console.error('Error retrieving messages:', e);
        }
    }
});

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
