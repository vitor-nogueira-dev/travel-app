export default class APIError extends Error {
  constructor(
    public readonly error_code: string,
    public readonly error_description: string,
    public readonly statusCode: number = 400
  ) {
    super(error_description);
  }
}
