import dotenv from "dotenv";
import { started } from "../commons/service";

export async function handler(event, context) {
    dotenv.config();
    return {
        statusCode: 200,
        body: JSON.stringify({
            started: started,
            db: process.env.DB_HOST,
        })
    };
}
