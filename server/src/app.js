import '@babel/polyfill';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import routemap from 'express-routemap';
import morgan from 'morgan';
import routes from './commons/routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('short'))
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server started on port: ' + port);
    // HERE IS THE FUN PART:
    routemap(app);

    // or use like this
    routemap(app, 'route-table.log');
})

module.exports = app;
