const defaultMessage:Record<400 | 401 | 403 | 404 | 500, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Access is denied',
    404: 'Page not found',
    500: 'Internal Server Error'
}

export class HTTPError extends Error{
    status = 500
    constructor(status: 400 | 401 | 403 | 404 | 500=500, message?: string){
        super()
        this.status = status
        this.message = message ? message : defaultMessage[status]
    }

}