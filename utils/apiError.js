class apiError {
  constructor(message, statusCode) {
    
    this.error = true;
    this.statusCode = statusCode;
    this.message = message;

  }
}

export { apiError };
