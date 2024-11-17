const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { email, password, name, companyName, phone_number, image } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            name,
            phone_number,
            image,  
            status: 'pending' 
        });

        await user.save();
        res.status(201).json({ message: 'User created and awaiting approval' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.status !== 'approved') {
            return res.status(400).json({ error: 'Invalid credentials or account not approved' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});
router.patch('/users/:id/approve', async (req, res) => {
    try {
        const { id } = req.params;
        const { approved } = req.body; 

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.status = approved ? 'approved' : 'rejected';
        await user.save();

        res.status(200).json({ message: `User ${approved ? 'approved' : 'rejected'}` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user status' });
    }
});

module.exports = router;
