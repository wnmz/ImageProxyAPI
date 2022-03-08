import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { proxyImage } from './Controllers/proxyImage';
const app = express();

//middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/api/proxyImage', proxyImage);

app.listen(process.env.PORT, () => {
  console.log(`⚡️ [Server]: Running at http://localhost:${process.env.PORT}`);
});