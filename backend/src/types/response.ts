class Response {
  success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }
}

export class SuccessResponse extends Response {
  constructor() {
    super(true);
  }

  static json = () => {
    const instance = new this();
    return {
      success: instance.success,
    };
  };
}
export class MessageResponse extends Response {
  message: string;

  constructor(message: string) {
    super(true);
    this.message = message;
  }

  static json = (message: string) => {
    const instance = new this(message);
    return {
      success: instance.success,
      message: instance.message,
    };
  };
}

export class DataResponse<T> extends Response {
  data: T;

  constructor(data: T) {
    super(true);
    this.data = data;
  }

  static json = <T>(data: T) => {
    const instance = new this(data);
    return {
      success: instance.success,
      data: instance.data,
    };
  };
}

export class ErrorResponse extends Response {
  message: string;
  error?: unknown;

  constructor(message: string, error?: unknown) {
    super(false);
    this.success = false;
    this.message = message;
    this.error = error;
  }

  static json = (message: string, error?: unknown) => {
    const instance = new this(message, error);
    return {
      success: instance.success,
      message: instance.message,
      error: instance.error,
    };
  };
}
