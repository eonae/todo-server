const cfg = require('./config');

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const history = require('connect-history-api-fallback');
const db = require('./db');
const MongoStore = require('connect-mongo')(session);


const auth = require('./routes/auth');
const tasks = require('./routes/tasks');

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  store: new MongoStore({
    mongooseConnection: db,
  }),
  secret: 'best todo ever',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    
  },
  resave: true,
  saveUninitialized: false
}));

app.use('/api/auth', auth);
app.use('/api/tasks', tasks);

app.use(history());
app.use(express.static('dist'));

app.listen(process.env.PORT || cfg.port);
