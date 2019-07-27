import '@babel/polyfill';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import routes from './commons/routes';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('short'))
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Server started on port: ' + port);

module.exports = app;
