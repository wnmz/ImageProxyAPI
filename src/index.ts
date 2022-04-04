import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { proxyImage } from './Controllers/proxyImage';
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "image/png")
  next();
});

// TODO: AntiSpam 
app.get('/api/proxyImage', proxyImage);

app.listen(port, () => {
  console.log(`⚡️ [Server]: Running at http://localhost:${port}`);
});