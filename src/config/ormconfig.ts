import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import Blog from "../database/entities/blog";
import User from "../database/entities/user";

dotenv.config();
const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env;

const connectDB =  new DataSource({
    type: "mysql",
    port: 3306,
    database: DB_DATABASE,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    logging: false,
    synchronize: true,
    entities: [Blog, User],
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

connectDB
    .initialize()
    .then(() => {
        console.log(`Data Source has been initialized`);
    })
    .catch((err) => {
        console.error(`Data Source initialization error`, err);
    })

export default connectDB;