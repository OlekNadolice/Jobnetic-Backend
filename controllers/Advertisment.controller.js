const AdvertisementService = require("../Services/Advertisment.service");

module.exports.createAdvertismentController = async (req, res) => {
  const data = await AdvertisementService.CreateAdvertismentService(req);
  res.json(data);
};

module.exports.fetchAdvertismentController = async (req, res) => {
  const data = await AdvertisementService.fetchAdvertismentService(req);
  res.json(data);
};

module.exports.fetchSingleAdvertismentController = async (req, res) => {
  const data = await AdvertisementService.fetchSingleAdvertismentService(req);
  res.json(data);
};

module.exports.sendCvAdvertismentController = async (req, res) => {
  const data = await AdvertisementService.sendCvAdvertismentService(req);
  res.json(data);
};
