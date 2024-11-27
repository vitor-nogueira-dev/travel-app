import express from "express";

import driversController from "../controllers/ride.controller";
import { hasCustomerBody, hasAddress, addressIsTheSame } from "../middlewares/ride.middleware";

const driverRoutes = express.Router();

driverRoutes.post("/estimate", hasCustomerBody, hasAddress, addressIsTheSame, driversController.getRideEstimates);

export default driverRoutes;