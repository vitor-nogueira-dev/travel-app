import connection from "../database/connection";

type QueryResult<T> = [T[], any];

export const executeQuery = async <T>(
  query: string,
  params: any[] = []
): Promise<T[]> => {
  try {
    const [rows] = await connection.execute<QueryResult<T>>(query, params);
    return rows;
  } catch (error) {
    console.error("Database Query Error:", { query, params, error });
    throw error;
  }
};
