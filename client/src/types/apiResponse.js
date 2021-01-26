// @flow

export type ApiResponse<T> = Promise<{
  code: number,
  message: string,
  success: boolean,
  result: T,
}>;
