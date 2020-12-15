type ApiCommonError = {
  type: "message";
  error: string;
};

type ApiError = ApiCommonError;

export type ApiSuccessResult<T> = {
  success: true;
  result: T;
};

export type ApiFailureResult = {
  success: false;
  error: ApiError;
};

export type ApiResult<T> = ApiSuccessResult<T> | ApiFailureResult;

export function ApiSuccessResult<T>(result?: T): ApiSuccessResult<T> {
  return {
    success: true,
    result,
  };
}

export function ApiError(error: string): ApiFailureResult {
  return {
    success: false,
    error: {
      type: "message",
      error: error
    },
  };
}
