const Advertisment = require("../Models/Advertisment");
const User = require("../Models/User");
const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");

module.exports.CreateAdvertismentService = async req => {
  try {
    const { Owner: token } = req.body;
    const id = jwt.verify(token, process.env.JWT_SECRET);

    const data = await Advertisment.create({ ...req.body, Owner: id.id });
    return { status: 201, message: "Succesfully created" };
  } catch (error) {
    return { status: 500, message: error };
  }
};

module.exports.fetchAdvertismentService = async req => {
  try {
    const { skip, limit } = req.query;
    const size = await Advertisment.count();

    const data = await Advertisment.find({}).limit(limit).skip(skip);

    return { size, data };
  } catch (error) {
    return { status: 500, message: error };
  }
};

module.exports.fetchSingleAdvertismentService = async req => {
  try {
    const { id } = req.query;
    const data = await Advertisment.findById(id);

    if (data) {
      return { status: 200, data: data };
    }
  } catch (err) {
    if (err.kind === "ObjectId") {
      return { status: 404, message: err };
    } else {
      return { status: 500, message: err };
    }
  }
};

module.exports.sendCvAdvertismentService = async req => {
  try {
    const { email, firstName, lastName, githubProfile, advertismentId } = req.body;
    const { Title } = await Advertisment.findById(advertismentId);
    const { Owner } = await Advertisment.findById(advertismentId);

    const { email: reciverEmail } = await User.findById(Owner);

    let message;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.em,
        pass: process.env.pw,
      },
    });

    let mailOptions = {
      from: '"Jobnetic Website" <jobneticwebsite@gmail.com>',
      to: email,
      subject: `Your application for ${Title}`,
      text: `Application  for ${Title} send succesfully`,
    };

    let mailOptions2 = {
      from: '"Jobnetic Website" <jobneticwebsite@gmail.com>',
      to: reciverEmail,
      subject: `You have received new resume`,
      text: `${firstName} ${lastName} send you cv ${githubProfile} `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        message = error;
      } else {
        message = { status: 201, message: "Resume send sucesffuly" };
      }
    });

    transporter.sendMail(mailOptions2, function (error, info) {
      if (error) {
        message = error;
      } else {
        message = { status: 201, message: "Resume send sucesffuly" };
      }
    });
  } catch (error) {
    return { status: 500 };
  }
};
