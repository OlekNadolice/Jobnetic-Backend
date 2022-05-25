const AuthService = require("../Services/AuthService");

module.exports.registerController = async (req, res) => {
  const data = await AuthService.registerService(req);
  res.json(data);
};

module.exports.loginController = async (req, res) => {
  const data = await AuthService.loginService(req);
  res.json(data);
};

module.exports.emailVerificationController = async (req, res) => {
  const data = await AuthService.emailVerificationService(req);
  res.json(data);
};
