import getRideEstimate from "./api.routes.services";
import drivesServices from "./drives.services";

import APIError from "../utils/APIError";
import functions from "../utils/functions";
import { ERROR_CODE_INVALID_DATA, DESCRIPTION_INVALID_DATA } from "../utils/constants";

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
      throw new APIError(ERROR_CODE_INVALID_DATA, DESCRIPTION_INVALID_DATA, 400);
    }

    const routeDetails = extractRouteDetails(route);
    if (!routeDetails) {
      throw new APIError(ERROR_CODE_INVALID_DATA, DESCRIPTION_INVALID_DATA, 400);
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


export default {
  getRideEstimates
};