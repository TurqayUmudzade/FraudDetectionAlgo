import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { checkTransactions } from './utilities';

dotenv.config();

const app: Express = express();
app.use(express.json())

const port = process.env.PORT || 3000;

app.post('/', (req: Request, res: Response) => {
    const { listOfTransactions, threshold }: { listOfTransactions: string[]; threshold: number } = req.body
    const fraudCreditCards = [...checkTransactions(listOfTransactions, threshold)]
    return res.json({ fraudCreditCards })
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});