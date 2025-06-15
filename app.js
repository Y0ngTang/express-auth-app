const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
