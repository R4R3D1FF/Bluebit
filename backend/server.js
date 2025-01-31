import express from 'express';
import router from './userRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const PORT = 8000;


const app = express();
app.use(cors({
    origin: "http://localhost:5173", 
}));


app.use(express.json())


app.use('/',router);






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})