import express, { Request, Response, NextFunction } from "express";

import driversController from "../controllers/ride.controller";
import { hasCustomerBody, hasAddress, addressIsTheSame, hasDriver, hasDistance, hasCustomerParam } from "../middlewares/ride.middleware";

import APIError from "utils/APIError";

import { DESCRIPTION_INVALID_DATA, ERROR_CODE_INVALID_DATA } from "utils/constants";

const driverRoutes = express.Router();

driverRoutes.post("/estimate", hasCustomerBody, hasAddress, addressIsTheSame, driversController.getRideEstimates);

driverRoutes.patch('/confirm', hasCustomerBody, hasAddress, addressIsTheSame, hasDriver, hasDistance, driversController.confirmRide);

driverRoutes.get('/drivers', driversController.getDrivers);

driverRoutes.get('/', (_req: Request, _res: Response, next: NextFunction) => {
  return next(new APIError(ERROR_CODE_INVALID_DATA, DESCRIPTION_INVALID_DATA, 400));
});

driverRoutes.get('/:customer_id', hasCustomerParam, driversController.getRidesByCustomerIdAndDriverId);

export default driverRoutes;