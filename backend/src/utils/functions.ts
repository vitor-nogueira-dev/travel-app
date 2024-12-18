import helpers from "@googlemaps/polyline-codec";

import { IDriver } from "../../src/interfaces/IDriver";
import { IRawRide, IRide } from "../../src/interfaces/IRide";

const decodedPolyline = (encodedPolyline: string) => helpers.decode(encodedPolyline);

const convertMetersToKm = (meters: number) => {
  return meters / 1000;
}

const formatDuration = (durationInSeconds: string): string => {
  const totalSeconds = parseInt(durationInSeconds.replace('s', ''), 10);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
};

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

const transformRideData = (ride: IRawRide): IRide => ({
  id: ride.id,
  date: ride.date,
  origin: ride.origin,
  destination: ride.destination,
  distance: ride.distance,
  duration: ride.duration,
  driver: ride.driver_id
    ? {
      id: ride.driver_id,
      name: ride.driver_name as string
    }
    : null,
  value: typeof ride.value === 'string'
    ? parseFloat(ride.value)
    : ride.value,
});

export default {
  decodedPolyline,
  convertMetersToKm,
  formatDuration,
  formatDrivers,
  transformRideData
}