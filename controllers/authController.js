const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 4);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, role });

    // Save the new user to the database
    await newUser.save();

    // Send response back to the client
    return res.status(201).json({
      msg: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }); // Use `User` here
    if (!user) {
      return res.status(400).send('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password); // Check the password here
    if (!isMatch) {
      return res.status(400).send('Invalid Credentials');
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { registerUser, loginUser };
