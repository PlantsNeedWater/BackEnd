const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const plantsRouter = require("./plants/plants-router");


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/plants", plantsRouter);

// server.use("*", (req, res) => {
//   res.json({api: "Up and running"})
// });

module.exports = server;