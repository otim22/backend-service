import express, { Application, Request, Response } from 'express';
import * as http from 'http';
import * as dotenv from "dotenv";
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
// import { CommonRoutesConfig } from './src/common/routes.config';
// import { UsersRoutes } from './src/routes/user.route';
import { route } from "./src/routes";
import debug, { IDebugger } from 'debug';
import "reflect-metadata"
import connectDB from "./src/config/ormconfig";

dotenv.config();
connectDB

const app: Application = express();
const server: http.Server = http.createServer(app);
// const routes: Array<CommonRoutesConfig> = [];
const debugLog: IDebugger = debug('app');
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

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

// routes.push(new UsersRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: Request, res: Response) => {
    res.status(200).send(runningMessage)
});

server.listen(port, () => {
    console.log(`app is running on port ${port}`);
    // routes.forEach((route: CommonRoutesConfig) => {
    //     debugLog(`Routes configured for ${route.getName()}`);
    // });
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    console.log(runningMessage);
});