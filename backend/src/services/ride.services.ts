import getRideEstimate from "./api.routes.services";
import drivesServices from "./drives.services";
import rideModel from "../models/ride.model";

import APIError from "../utils/APIError";
import functions from "../utils/functions";
import { ERROR_CODE_INVALID_DATA, DESCRIPTION_INVALID_DATA, STATUS_CODE_NOT_FOUND, ERROR_CODE_RIDE_NOT_FOUND, DESCRIPTION_RIDE_NOT_FOUND, STATUS_CODE_BAD_REQUEST } from "../utils/constants";

const extractRouteDetails = (route: any) => {
  if (!route) return null;

  const polyline = route.polyline?.encodedPolyline;
  const distanceMeters = route.distanceMeters || 0;
  const duration = functions.formatDuration(route.duration || '0s');

  const decoded = polyline ? functions.decodedPolyline(polyline) : [];
  const [latitudeOrigin, longitudeOrigin] = decoded[0] || [];
  const [latitudeDestination, longitudeDestination] = decoded[decoded.length - 1] || [];

  return {
    polyline,
    distanceMeters,
    duration,
    origin: { latitude: latitudeOrigin, longitude: longitudeOrigin },
    destination: { latitude: latitudeDestination, longitude: longitudeDestination },
  };
};

const getRideEstimates = async (origin: string, destination: string) => {
  try {
    const estimate = await getRideEstimate(origin, destination);
    const route = estimate?.routes?.[0];

    if (!route) {
      throw new APIError(ERROR_CODE_INVALID_DATA, DESCRIPTION_INVALID_DATA, STATUS_CODE_BAD_REQUEST);
    }

    const routeDetails = extractRouteDetails(route);
    if (!routeDetails) {
      throw new APIError(ERROR_CODE_INVALID_DATA, DESCRIPTION_INVALID_DATA, STATUS_CODE_BAD_REQUEST);
    }

    const km = functions.convertMetersToKm(routeDetails.distanceMeters);

    const driversByKm = await drivesServices.getDriversByMinKm(km);

    return {
      origin: routeDetails.origin,
      destination: routeDetails.destination,
      distance: routeDetails.distanceMeters,
      duration: routeDetails.duration,
      options: driversByKm,
      routeResponse: route,
    };
  } catch (error) {
    console.error("Error in getRideEstimates:", (error as APIError).message);
    throw error;
  }
};

const getRidesByCustomerIdAndDriverId = async (customerId: number, driverId?: number) => {
  const rides = await rideModel.getRidesByCustomerIdAndDriverId(customerId, driverId);
  
  if (rides.length === 0) {
    throw new APIError(ERROR_CODE_RIDE_NOT_FOUND, DESCRIPTION_RIDE_NOT_FOUND, STATUS_CODE_NOT_FOUND);
  }

  return rides;
}

export default {
  getRideEstimates,
  getRidesByCustomerIdAndDriverId
};