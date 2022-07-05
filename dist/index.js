"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
let messages = [];
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(messages));
});
app.get('/messages/send', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let user = req.query.user;
    let timestamp = req.query.timestamp;
    let content = req.query.content;
    messages.push({
        "user": user == undefined ? "undefined" : user.toString(),
        "timestamp": timestamp == undefined ? 0 : parseInt(timestamp.toString()),
        "content": content == undefined ? "undefined" : content.toString(),
    });
    res.send("200 Successful");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
