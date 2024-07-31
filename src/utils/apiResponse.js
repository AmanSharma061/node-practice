class apiResponse {
  constructor(data, message) {
    this.error = false;
    this.data = data;
    this.message = message;
  }
}

export { apiResponse };
