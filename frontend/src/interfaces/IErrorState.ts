export interface IErrorState extends Error {
  error_code: number;
  error_description: string;
}