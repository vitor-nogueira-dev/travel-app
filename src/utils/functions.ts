import { IDriver } from "../../src/interfaces/IDriver";

const convertMetersToKm = (meters: number) => {
  return meters / 1000;
}

const formatDrivers = (drivers: IDriver[]) =>
  drivers.map(driver => ({
    id: driver.id,
    name: driver.name,
    description: driver.description,
    vehicle: driver.vehicle,
    review: {
      rating: driver.rating,
      comment: driver.comment,
    },
    value: driver.value,
  }));


export default {
  convertMetersToKm,
  formatDrivers,
}