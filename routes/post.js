const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 게시글 전체 조회
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('서버 오류');
        }
        res.json(results);
    });
});

// 게시글 상세 조회
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM posts WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('서버 오류');
        }
        res.json(results[0]);
    });
});

// 게시글 등록
router.post('/', (req, res) => {
    const { title, content } = req.body;
    const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    db.query(sql, [title, content], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('서버 오류');
        }
        res.status(201).json({ id: results.insertId, title, content });
    });
});

// 게시글 수정
router.put('/:id', (req, res) => {
    id = req.params.id;
    const { title, content } = req.body;
    const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    db.query(sql, [title, content, id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('서버 오류');
        }
        res.sendStatus(200);
    });
});

// 게시글 삭제
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM posts WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('서버 오류');
        }
        res.sendStatus(204);
    });
});

module.exports = router;