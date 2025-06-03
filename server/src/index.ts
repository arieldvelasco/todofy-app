import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './lib/db'; // Adjust the path as necessary
import router from './routes/todo.route'; // Adjust the path as necessary

dotenv.config();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: '*', // Allow all origins for development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
};

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', router); // Use the todo routes

connectDB(); // Connect to MongoDB

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('<h1>Todofy</h1>');
});