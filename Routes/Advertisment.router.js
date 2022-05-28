const express = require("express");
const AdvertismentRouter = express.Router();
const AdvertismentController = require("../controllers/Advertisment.controller");

AdvertismentRouter.post(
  "/create",

  AdvertismentController.createAdvertismentController
);

AdvertismentRouter.post("/sendCv", AdvertismentController.sendCvAdvertismentController);

AdvertismentRouter.get("/all", AdvertismentController.fetchAdvertismentController);

AdvertismentRouter.get(
  "/single",
  AdvertismentController.fetchSingleAdvertismentController
);

module.exports = AdvertismentRouter;
