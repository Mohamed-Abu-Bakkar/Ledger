const User = require('../models/User');

exports.signup = async (req, res) => {
try {
const { username, password } = req.body;
const exist = await User.findOne({ username });
if (exist) return res.status(400).json({ msg: 'Username already exists' });


const user = new User({ username, password });
await user.save();
res.status(201).json({ msg: 'User created' });
} catch (err) {
res.status(500).json({ msg: 'Server error' });
}
};

exports.login = async (req, res) => {
try {
const { username, password } = req.body;
const user = await User.findOne({ username, password });
if (!user) return res.status(400).json({ msg: 'Invalid credentials' });


res.json({ msg: 'Login successful', username });
} catch (err) {
res.status(500).json({ msg: 'Server error' });
}
};