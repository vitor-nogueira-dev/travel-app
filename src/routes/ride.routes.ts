import express from "express";

import driversController from "../controllers/ride.controller";
import { hasCustomerBody, hasAddress, addressIsTheSame, hasDriver, hasDistance } from "../middlewares/ride.middleware";

const driverRoutes = express.Router();

driverRoutes.post("/estimate", hasCustomerBody, hasAddress, addressIsTheSame, driversController.getRideEstimates);

driverRoutes.patch('/confirm', hasCustomerBody, hasAddress, addressIsTheSame, hasDriver, hasDistance, driversController.confirmRide);

export default driverRoutes;