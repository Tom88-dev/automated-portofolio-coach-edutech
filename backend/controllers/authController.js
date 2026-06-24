const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email sudah digunakan"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Register berhasil",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Password salah"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      "SECRETKEY123",
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};