const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 홈화면
router.get('/', (req, res) => {
    res.render('home');
});

// 회원가입 폼
router.get('/register', (req, res) => {
    res.render('register');
});

// 회원가입 처리
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.send('회원가입 실패');
        }
        res.send('회원가입 성공');
    });
});  

// 로그인 폼
router.get('/login', (req, res) => {
    res.render('login');
});

// 로그인 처리
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.send('로그인 실패');
        }
        
        if (!results.length) {
            return res.send('아이디 또는 비밀번호 불일치');
        }
    
        const user = results[0];
        if (user.password !== password) {
            return res.send('아이디 또는 비밀번호 불일치');
        }
    
        req.session.user = user;
        res.send('로그인 성공');
    });
});  

module.exports = router;