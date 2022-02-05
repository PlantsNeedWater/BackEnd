const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const plantsRouter = require("./plants/plants-router");
const authRouter = require("./auth/auth-router");
const {logger, restricted} = require("./middleware/middleware");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", logger, authRouter);

server.use("/api/plants", logger, restricted, plantsRouter);


// server.use("*", (req, res) => {
//   res.json({api: "Up and running"})
// });

module.exports = server;