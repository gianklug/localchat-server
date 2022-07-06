import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

let messages: { user: string; timestamp: number; content: string; lat: number; long: number; }[] = []

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

app.get('/messages/get', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  let lat = req.query.lat  == undefined ? 0 : parseInt(req.query.lat.toString())
  let long = req.query.long  == undefined ? 0 : parseInt(req.query.long.toString())
  let msgToSend: { user: string; timestamp: number; content: string;}[] = []
  messages.forEach(
    function(message) {
      if (getDistanceFromLatLonInKm(lat, long, message.lat, message.long) < 100) {
        msgToSend.push(
          {
            "user": message.user,
            "timestamp": message.timestamp,
            "content": message.content
          }
        );
      }
    }
  );
  res.send(JSON.stringify(msgToSend));

});

app.get('/messages/send', (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(req.query);
  let user = req.query.user;
  let timestamp = req.query.timestamp;
  let content = req.query.content;
  let lat = req.query.lat;
  let long = req.query.long;


  messages.push({
    "user": user == undefined ? "undefined" : user.toString(),
    "timestamp": timestamp == undefined ? 0 : parseInt(timestamp.toString()),
    "content": content == undefined ? "undefined" : content.toString(),
    "lat": lat == undefined ? 0 : parseInt(lat.toString()),
    "long": long == undefined ? 0 : parseInt(long.toString()),

  })
  res.send("200 Successful");
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});