export const responseHandler = (
  response: any,
  httpStatus: number,
  message: string,
  data?: any,
) => {
  if (httpStatus === 201) {
    return response.status(httpStatus).json({
      message,
      data,
    });
  } else {
    return response.status(httpStatus).json({
      statusCode: httpStatus,
      message,
      error: 'Bad Request',
    });
  }
};
