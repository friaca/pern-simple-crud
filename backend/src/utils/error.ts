export class GenericError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  getCode() {
    const instance = this.constructor.name;

    switch (instance) {
      case 'BadRequest':
        return 400;
      case 'NotFound':
        return 404;
      default:
        return 500;
    }
  }
}

export class BadRequest extends GenericError {}
export class NotFound extends GenericError {}
