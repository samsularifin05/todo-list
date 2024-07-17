export interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
  count: number;
}
export interface ErrorResponse {
  status: number;
  message: string;
}
export interface RefresTokenInterFace {
  access_token: string;
  refresh_token: string;
}
