import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

let messages: { user: string; timestamp: number; content: string; }[] = []

app.get('/', (req: Request, res: Response) => {
  res.setHeader('Content-Type','application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(JSON.stringify(messages));

});

app.get('/messages/send', (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let user = req.query.user;
  let timestamp = req.query.timestamp;
  let content = req.query.content;

  messages.push({
    "user": user == undefined ? "undefined" : user.toString(),
    "timestamp": timestamp == undefined ? 0 : parseInt(timestamp.toString()),
    "content": content == undefined ? "undefined" : content.toString(),
  })
  res.send("200 Successful");
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});