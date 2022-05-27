const express = require('express');
const router = express.Router();
const { register } = require('../controllers/auth');
router.post('/register', (req, res) => {
  register(req, res);
});
router.post('/login', (req, res) => {});
router.get('/confirm/:confirmationCode', (req, res) => {});

module.exports = router;
