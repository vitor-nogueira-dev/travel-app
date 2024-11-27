import { NextFunction, Request, Response } from "express";

import rideServices from "../services/ride.services";
import drivesServices from "../services/drives.services";
import ridesModel from "../models/ride.model";

import { STATUS_CODE_OK, } from "../utils/constants";

const getRideEstimates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { destination, origin } = req.body;

    const estimate = await rideServices.getRideEstimates(origin, destination);

    return res.status(STATUS_CODE_OK).json(estimate);
  } catch (error) {
    next(error);
  }
};

const confirmRide = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { driver: { id }, distance } = req.body;

    await drivesServices.getDriverById(id);
    await drivesServices.validateDistanceDriver(id, distance);

    await ridesModel.saveRide(req.body);
    res.status(STATUS_CODE_OK).json({ "success": true });
  } catch (error) {
    next(error);
  }
}

export default {
  getRideEstimates,
  confirmRide
};