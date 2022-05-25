const Advertisment = require("../Models/Advertisment");
const User = require("../Models/User");
const nodemailer = require("nodemailer");

module.exports.CreateAdvertismentService = async req => {
  try {
    await Advertisment.create({ ...req.body });
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
    const { firstName, lastName, email, githubProfile, id } = req.body;
    const advertisment = await Advertisment.findById(id);
    const advertismentOwnerID = advertisment.owner;
    const { email: reciverEmail } = await User.findById(advertisementOwnerID);

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  } catch (err) {
    return { status: 500, message: err };
  }
};
