import { RowDataPacket } from "mysql2";

export interface IDriver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  value: number;
  min_distance_km: number;
}

export interface IDriverRaw extends RowDataPacket, IDriver { }