export interface IApiResponse {
  status: boolean;
  error_code: number;
  message: string;
  data: any;
}

export interface IPagination {
  total: number;
  offset: number;
  limit: number;
}
