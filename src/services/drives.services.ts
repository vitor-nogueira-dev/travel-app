import driversModel from "../models/drivers.model";

import functions from "../../src/utils/functions";

const getDriversByMinKm = async (km: number) => {
  const drivers = await driversModel.getDriversByMinKm(km);
  return functions.formatDrivers(drivers);
};

export default {
  getDriversByMinKm,
};