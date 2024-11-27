import { IDriver } from "./IDriver";

export interface ITravel {
  id: string;
  customerId: string;
  driver: {
    id: number,
    name: string
  };
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
  date: string;
}

export interface ITravelHistory {
  customer_id: string;
  rides: ITravel[];
}

export interface ITravelOption {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: IDriver[];
  routeResponse: {
    distanceMeters: number;
    duration: string;
    polyline: {
      encodedPolyline: string;
    };
  };
}

export interface ITravelState {
  userId: string;
  origin: string;
  destination: string;
  tripOptions: ITravelOption | null;
  selectedDriver: IDriver | null;
  travelHistory: ITravelHistory;
  drivers: IDriver[];
  loading: boolean;
  error: string | null;
}