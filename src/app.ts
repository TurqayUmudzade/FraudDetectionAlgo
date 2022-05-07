import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { checkTransactions } from './utilities';

dotenv.config();

const app: Express = express();
app.use(express.json())

const port = process.env.PORT || 3000;
const threshold = process.env.THRESHOLD || 50




app.post('/', (req: Request, res: Response) => {
    const { listOfTransactions }: any = req.body

    let arr = [...checkTransactions(listOfTransactions)]
    return res.json(arr)


    // res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});