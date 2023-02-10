require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const dbConnectionCheck = require('./db/dbConnectCheck');

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
};

const { PORT, SESSION_SECRET } = process.env;

const app = express();
dbConnectionCheck();
app.use(cors(corsOptions));
// тут импорты всех роутов, если нужно

const login = require('./src/routes/login');
const register = require('./src/routes/login');
const logout = require('./src/routes/login');
const addArticle = require('./src/routes/menu');
const deleteArticle = require('./src/routes/menu');
const deleteCat = require('./src/routes/menu');
const contact = require('./src/routes/contact');

const staticPath = path.resolve(__dirname, '..', 'client', 'out', '_next', 'static');
app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));
// Для того, чтобы обрабатывать тела запросов, которые через метод POST
app.use(express.json());

// КОНФИГ ДЛЯ КУКИ
const sessionConfig = {
  name: 'OwlCookie', // * Название куки
  store: new FileStore(), // * подключение стора (БД для куки) для хранения
  secret: SESSION_SECRET ?? 'shamil', // * ключ для шифрования куки
  resave: false, // * если true, пересохраняет сессию, даже если она не поменялась
  saveUninitialized: false, // * Если false, куки появляются только при установке req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10, // * время жизни в ms (10 дней)
    httpOnly: true, // * куки только по http
  },
};
// подключение мидлвара для куки
app.use(session(sessionConfig));

// ссылки на роуты

// app.use('/animalcard', AnimalCardRouter);
app.use('/', login);
app.use('/', register);
app.use('/', addArticle);
app.use('/', deleteArticle);
app.use('/', deleteCat);
app.use('/', logout);
app.use('/', contact);

app.listen(PORT ?? 3100, () => {
  console.log(`Сервер запущен! на ${PORT} порту`);
});
