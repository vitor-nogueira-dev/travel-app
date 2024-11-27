import { executeQuery } from "../../src/utils/executeQuery";
import functions from "../../src/utils/functions";

import { IRide, IRawRide, IRideSave } from "../../src/interfaces/IRide";

const saveRide = async (ride: IRideSave) => {
  const date = new Date();

  const localOffset = date.getTimezoneOffset() * 60000;

  const brasiliaOffset = -3 * 60;
  const brasiliaTime = new Date(date.getTime() + localOffset + brasiliaOffset * 60000);

  const formattedDate = brasiliaTime.toISOString().slice(0, 19).replace('T', ' ');

  return executeQuery<void>(
    'INSERT INTO rides (customer_id, date, destination, origin, distance, duration, driver_id, value) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [ride.customer_id, formattedDate, ride.destination, ride.origin, ride.distance, ride.duration, ride.driver.id, ride.value]
  );
};

const getRidesByCustomerIdAndDriverId = async (
  customerId: number,
  driverId?: number
): Promise<IRide[]> => {
  const baseQuery = `
    SELECT 
      r.id,
      r.date,
      r.origin,
      r.destination,
      r.distance,
      r.duration,
      d.id AS driver_id,
      d.name AS driver_name,
      r.value
    FROM 
      rides r
    ${driverId ? 'LEFT' : 'INNER'} JOIN 
      drivers d ON r.driver_id = d.id
    WHERE 
      r.customer_id = ?
      ${driverId ? 'AND r.driver_id = ?' : ''}
    ORDER BY 
      r.date DESC
  `;

  const queryParams = driverId ? [customerId, driverId] : [customerId];

  const rides = await executeQuery<IRawRide>(
    baseQuery,
    queryParams
  );

  return rides.map(functions.transformRideData);
};


export default { saveRide, getRidesByCustomerIdAndDriverId };