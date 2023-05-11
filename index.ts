import express, { Application, Request, Response } from 'express';
import * as http from 'http';
import * as dotenv from "dotenv";
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { route } from "./src/routes";
import debug, { IDebugger } from 'debug';
import "reflect-metadata"
import connectDB from "./src/config/ormconfig";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB

const app: Application = express();
const server: http.Server = http.createServer(app);
const debugLog: IDebugger = debug('app');
const port = process.env.PORT || "3001";

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));
route(app);

const runningMessage = `Server running at http://localhost:${port}`;

app.get('/', (req: Request, res: Response) => {
    res.status(200).send(runningMessage)
});

server.listen(port, () => {
    console.log(runningMessage);
});