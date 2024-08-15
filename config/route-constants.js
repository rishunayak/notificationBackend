const baseRoute='/api/backend'
const appVersion='/v1'

export const ROUTES={
    BASE_ROUTE:`${baseRoute}`,
    SWAGGER_ROUTE:'/api-docs',
    SEND_NOTIFICATION: `${appVersion}/send-notification/:type`,
    GET_NOTIFICATION: `${appVersion}/notification/:notificationId`
}