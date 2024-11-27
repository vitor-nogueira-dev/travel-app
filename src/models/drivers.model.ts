import { executeQuery } from "../../src/utils/executeQuery";

import { IDriverRaw } from "../../src/interfaces/IDriver";

const getDriversByMinKm = async (km: number): Promise<IDriverRaw[]> => {
  return executeQuery<IDriverRaw>(
    `SELECT 
      *,
      'Avaliação disponível' AS comment, -- Placeholder para o campo de comentário
      GREATEST(min_distance_km, ?) * rate_per_km AS value
    FROM 
      drivers
    WHERE 
      min_distance_km <= ?
    ORDER BY 
      value ASC;`,
    [km, km]
  );
}

const getDriverById = async (id: number): Promise<IDriverRaw[]> => {
  return executeQuery<IDriverRaw>(
    `SELECT * FROM drivers WHERE id = ?;`,
    [id]
  );
};

const getDrivers = async (): Promise<IDriverRaw[]> => {
  return executeQuery<IDriverRaw>(
    `SELECT * FROM drivers;`
  );
}

export default {
  getDriversByMinKm,
  getDriverById,
  getDrivers
};