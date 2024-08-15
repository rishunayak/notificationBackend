import Express from 'express'
import { ROUTES } from '../../config/route-constants.js'
import { getNotificationController, sendNotificationController } from '../controllers/SendNotificationController.js'


export const pearlRoute=Express.Router()


pearlRoute.post(ROUTES.SEND_NOTIFICATION,(req,res,next)=>{
    sendNotificationController(req,res,next)
})

pearlRoute.get(ROUTES.GET_NOTIFICATION,(req,res,next)=>{
    getNotificationController(req,res,next)
})