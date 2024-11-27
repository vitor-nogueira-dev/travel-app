import { NextFunction, Request, Response } from "express";

import rideServices from "../services/ride.services";

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

export default {
  getRideEstimates
};