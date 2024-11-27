import driversModel from "../models/drivers.model";

import { ERROR_CODE_DRIVER_NOT_FOUND, DESCRIPTION_DRIVER_NOT_FOUND, STATUS_CODE_NOT_FOUND, ERROR_CODE_INVALID_DISTANCE, DESCRIPTION_INVALID_DISTANCE, STATUS_CODE_NOT_ACCEPTABLE, ERROR_CODE_INVALID_DRIVER, DESCRIPTION_INVALID_DRIVER, STATUS_CODE_BAD_REQUEST } from "../utils/constants";
import APIError from "../utils/APIError";
import functions from "../../src/utils/functions";

import { IDriverRaw } from "../../src/interfaces/IDriver";

const getDriversByMinKm = async (km: number) => {
  const drivers = await driversModel.getDriversByMinKm(km);
  return functions.formatDrivers(drivers);
};

const validateDistanceDriver = async (driverId: number, distance: number) => {
  const driver = await driversModel.getDriverById(driverId);

  if (!driver.length) {
    throw new APIError(ERROR_CODE_DRIVER_NOT_FOUND, DESCRIPTION_DRIVER_NOT_FOUND, STATUS_CODE_NOT_FOUND);
  }

  const distanceInKm = functions.convertMetersToKm(distance);

  const distanceIsValid = driver[0]?.min_distance_km <= distanceInKm;

  if (!distanceIsValid) {
    throw new APIError(ERROR_CODE_INVALID_DISTANCE, DESCRIPTION_INVALID_DISTANCE, STATUS_CODE_NOT_ACCEPTABLE);
  }

  return true;
}

const getDriverById = async (driverId: number, isGetRides?: boolean) => {
  const hasDriver = await driversModel.getDriverById(driverId) || []

  const { error_code, error_description, status_code } = {
    error_code: isGetRides ? ERROR_CODE_INVALID_DRIVER : ERROR_CODE_DRIVER_NOT_FOUND,
    error_description: isGetRides ? DESCRIPTION_INVALID_DRIVER : DESCRIPTION_DRIVER_NOT_FOUND,
    status_code: isGetRides ? STATUS_CODE_BAD_REQUEST : STATUS_CODE_NOT_FOUND
  }

  if (!Array.isArray(hasDriver) || !hasDriver.length) {
    throw new APIError(error_code, error_description, status_code);
  }

  return functions.formatDrivers(hasDriver as IDriverRaw[])[0];
}

const getDrivers = async () => {
  const drivers = await driversModel.getDrivers();
  return functions.formatDrivers(drivers as IDriverRaw[]);
}

export default {
  getDriversByMinKm,
  validateDistanceDriver,
  getDriverById,
  getDrivers,
};