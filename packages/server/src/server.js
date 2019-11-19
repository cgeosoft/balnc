import '@babel/polyfill';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import rateLimit from "express-rate-limit";
import routemap from 'express-routemap';
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { createServer } from 'http';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import morgan from 'morgan';
import * as path from 'path';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import routes from './commons/routes';


const GRAPHQL_PORT = 10102;
const GRAPHQL_PATH = '/graphql';
const GRAPHQL_SUBSCRIPTION_PORT = 10103;
const GRAPHQL_SUBSCRIPTION_PATH = '/subscriptions';

const dataset = {
  boards: [],
  messages: [],
}

function log(msg) {
  const prefix = '# GraphQL Server: ';
  if (typeof msg === 'string')
    console.log(prefix + msg);
  else console.log(prefix + JSON.stringify(msg, null, 2));
}

function sortByUpdatedAtAndPrimary(a, b) {
  if (a.updatedAt > b.updatedAt) return 1;
  if (a.updatedAt < b.updatedAt) return -1;

  if (a.updatedAt === b.updatedAt) {
    if (a._id > b._id) return 1;
    if (a._id < b._id) return -1;
    else return 0;
  }
}

function feed(args, set) {
  log('## feed', set, args);
  // sorted by updatedAt and primary
  const sortedDocuments = dataset[set].sort(sortByUpdatedAtAndPrimary);

  // only return where updatedAt >= minUpdatedAt
  const filterForMinUpdatedAtAndId = sortedDocuments.filter(doc => {
    if (doc.updatedAt < args.minUpdatedAt) return false;
    if (doc.updatedAt > args.minUpdatedAt) return true;
    if (doc.updatedAt === args.minUpdatedAt) {
      if (doc._id > args.lastId) return true;
      else return false;
    }
  });

  // limit
  const limited = filterForMinUpdatedAtAndId.slice(0, args.limit);
  return limited;
}

function set(args, set) {
  log('## set', set, args);
  const doc = args.doc;
  boards = boards.filter(d => d._id !== doc._id);
  doc.updatedAt = Math.round(new Date().getTime() / 1000);
  boards.push(doc);

  pubsub.publish(
    'boardChanged',
    {
      boardChanged: doc
    }
  );
  log('published boardChanged ' + doc._id);

  return doc;
}

const app = express();

app.use(cors());

const pubsub = new PubSub();

const gqlTypes = fileLoader(path.join(__dirname, '../node_modules/@balnc/commons/**/*.graphql'), { recursive: true })
const gqlResolvers = fileLoader(path.join(__dirname, "../node_modules/@balnc/commons/**/*.resolvers.*"))

// server graphql-endpoint
app.use(GRAPHQL_PATH, graphqlHTTP({
  schema: mergeTypes(gqlTypes),
  rootValue: mergeResolvers(gqlResolvers),
  graphiql: true,
}));

app.listen(GRAPHQL_PORT, () => {
  log('Started graphql-endpoint at http://localhost:' +
    GRAPHQL_PORT + GRAPHQL_PATH
  );
});


const appSubscription = express();
const serverSubscription = createServer(appSubscription);

serverSubscription.listen(GRAPHQL_SUBSCRIPTION_PORT, () => {
  log(
    'Started graphql-subscription endpoint at http://localhost:' +
    GRAPHQL_SUBSCRIPTION_PORT + GRAPHQL_SUBSCRIPTION_PATH
  );
  const subServer = new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: mergeTypes(gqlTypes),
      rootValue: {
        boardChanged: pubsub.asyncIterator('boardChanged'),
        messageChanged: pubsub.asyncIterator('messageChanged')
      }
    },
    {
      server: serverSubscription,
      path: GRAPHQL_SUBSCRIPTION_PATH,
    }
  );
});


// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('short'))
app.use('/api', limiter);
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server started on port: ' + port);
  // HERE IS THE FUN PART:
  routemap(app);

  // or use like this
  routemap(app, 'route-table.log');
})

  // comment this in for testing of the subscriptions
/*
setInterval(() => {
    pubsub.publish(
        'boardChanged',
        {
            boardChanged: {
                _id: 'foobar'
            }
        }
    );
    console.log('published boardChanged');
}, 1000); */
