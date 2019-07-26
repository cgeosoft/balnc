import dotenv from "dotenv";

export async function handler(event, context) {
    dotenv.config();
    return {
        statusCode: 200,
        body: JSON.stringify({
            db: process.env.DB_HOST
        })
    };
}
