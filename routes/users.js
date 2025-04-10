const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Editar usuário
router.put('/', auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('cpf', 'CPF is required').not().isEmpty(),
], async (req, res) => {
    const { name, cpf } = req.body;
    const userId = req.user.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const user = await User.findById(userId, (err, results) => {
            if (err) return res.status(500).json({ msg: 'Server error' });
            return results[0];
        });

        if (!user) return res.status(404).json({ msg: 'User  not found' });

        const updatedUser  = { name, cpf };
        User.update(userId, updatedUser , (err) => {
            if (err) return res.status(500).json({ msg: 'Server error' });
            res.json({ msg: 'User  updated successfully' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Deletar usuário
router.delete('/', auth, (req, res) => {
    const userId = req.user.id;

    User.delete(userId, (err) => {
        if (err) return res.status(500).json({ msg: 'Server error' });
        res.json({ msg: 'User  deleted successfully' });
    });
});

module.exports = router;