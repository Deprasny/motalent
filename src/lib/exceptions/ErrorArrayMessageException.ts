export class ErrorArrayMessageException extends Error {
    constructor(message: Array<string>) {
        super(message.join(', '));

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ErrorArrayMessageException.prototype);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorArrayMessageException);
        }

        this.name = 'ErrorArrayMessageException';
    }
}
