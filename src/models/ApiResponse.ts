export interface ApiResponse<D = any, M = string> {
  message: M;
  data: D;
}
