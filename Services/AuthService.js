const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerService = async req => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name: name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return { status: 201 };
  } catch (err) {
    console.log(err);
    return { status: 500, message: err };
  }
};

module.exports.loginService = async req => {
  try {
    let { email, password } = req.body;
    console.log(email, password);

    const userDB = await User.findOne({ email: email });

    if (userDB) {
      const validatePassword = await bcrypt.compare(password, userDB.password);
      if (validatePassword) {
        const token = jwt.sign({ id: userDB._id }, process.env.JWT_SECRET);
        return { status: 201, token, name: userDB.name };
      }
    }

    return { status: 401, message: "Invalid Login Data!" };
  } catch (err) {
    console.log(err);
    return { status: 500, message: err };
  }
};

module.exports.emailVerificationService = async req => {
  try {
    const { email } = req.body;

    const isEmailAlreadyExists = await User.findOne({ email: email.toLowerCase() });
    if (isEmailAlreadyExists) {
      return { status: 200 };
    } else {
      return { status: 404 };
    }
  } catch (err) {
    return { status: 500, message: err };
  }
};
