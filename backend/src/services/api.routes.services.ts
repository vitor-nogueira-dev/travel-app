import 'dotenv/config'
import axios from "axios";

const BASE_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const headers = {
  "Content-Type": "application/json",
  "X-Goog-Api-Key": GOOGLE_API_KEY,
  "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
}

const getRideEstimate = async (origin: string, destination: string) => {
  const body = {
    "origin": {
      "address": origin
    },
    "destination": {
      "address": destination
    },
    "travelMode": "DRIVE"
  }
  const response = await axios.post(BASE_URL, body, { headers: headers })
  return response.data;
}

export default getRideEstimate;