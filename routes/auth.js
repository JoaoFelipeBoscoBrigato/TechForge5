const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// Login
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        let user = await User.findByEmail(email, (err, results) => {
            if (err) return res.status(500).json({ msg: 'Server error' });
            return results[0];
        });

        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { user: { id: user.id } };
        jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Registro de usuário
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('cpf', 'CPF is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, cpf } = req.body;

    try {
        let user = await User.findByEmail(email, (err, results) => {
            if (err) return res.status(500).json({ msg: 'Server error' });
            return results[0];
        });

        if (user) return res.status(400).json({ msg: 'User  already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = { name, email, password: hashedPassword, cpf };
        User.create(user, (err) => {
            if (err) return res.status(500).json({ msg: 'Server error' });
            res.status(201).json({ msg: 'User  registered successfully' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

const jwt = require('jsonwebtoken');
router.post('/login', (req, res) => {
  // Verifica credenciais
  const token = jwt.sign({ userId: 1 }, 'SEGREDO', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;