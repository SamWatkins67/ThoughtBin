import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import thoughtRoutes from './routes/thoughtRoutes.js'


const app = express(); 
app.use(express.json(), cors()); 

app.use('/api', thoughtRoutes);

app.use(cors({
    origin: 'http://localhost:5173'
    }));

app.use(cors())

dotenv.config();

const PORT = process.env.PORT;

dbConnect();

app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);