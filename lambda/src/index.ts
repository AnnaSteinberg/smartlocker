import dotenv from 'dotenv';
import cors from 'cors';
import express , {Request, Response}from 'express';
import {requestLogger} from "./middleware/request-logger";

dotenv.config();
const app=express();
const PORT=process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/health',async (req:Request,res:Response)=>{
    res.json({
        status: 'ok',
        service: 'lambda',
    });
});

app.listen(PORT, () => {
    console.log(`Lambda service is running on http://localhost:${PORT}`);
})
