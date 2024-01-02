class AppError extends Error {
  public isOperational: boolean;
  public status: string;

  constructor(public statusCode: number, public message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message || "Something went wrong, please try again later.";
    this.isOperational = `${this.statusCode}`.startsWith("4");

    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
  }
}

export default AppError;
