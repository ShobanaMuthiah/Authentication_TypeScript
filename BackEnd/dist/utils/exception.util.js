"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPError = void 0;
const defaultMessage = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Access is denied',
    404: 'Page not found',
    500: 'Internal Server Error'
};
class HTTPError extends Error {
    constructor(status = 500, message) {
        super();
        this.status = 500;
        this.status = status;
        this.message = message ? message : defaultMessage[status];
    }
}
exports.HTTPError = HTTPError;
