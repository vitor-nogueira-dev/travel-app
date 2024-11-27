import { RowDataPacket } from "mysql2";

export interface IRideSave {
  id: number;
  customer_id: number;
  date: Date;
  destination: string;
  origin: string;
  distance: number;
  duration: number;
  driver: {
    id: number;
    name: string;
  }
  value: number;
}


interface Driver {
  id: number;
  name: string;
}

export interface IRide {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  driver: Driver | null;
  value: number;
}

export interface IRawRide extends RowDataPacket {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  driver_id: number | null;
  driver_name: string | null;
  value: string | number;
}