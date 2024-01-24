// 2). Whole axios catch error handler
export const handleApiError = (err: any) => {
  // If there is direct message from backend from AppError
  if (err.response?.data?.message) {
    throw new Error(err.response.data.message);

    // If there is thrown error from frontend side by requests APIs
  } else if (err?.message) {
    throw new Error(err.message);

    // Don't know what the error is about
  } else {
    console.error(`Api Unknown Error`, err);
    throw new Error("Something went wrong. Please try again later!");
  }
};
