const cfg = require('./config');

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const db = require('./db');
const MongoStore = require('connect-mongo')(session);


const auth = require('./routes/auth');
const tasks = require('./routes/tasks');

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.static('dist'));
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

app.use('/auth', auth);

app.use('/tasks', tasks);

app.get('/admin', (req, res) => {

  if (req.session.user)
    res.send(req.session.user);

  else res.sendStatus(403);
});

app.use((req, res) => {
  res.redirect('/');
});

app.listen(process.env.PORT || cfg.port);
