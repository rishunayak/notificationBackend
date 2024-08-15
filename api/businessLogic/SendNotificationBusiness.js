
import logger from "../../helper/logger.js";
import {  dbIdValider, sendNotificationPayloadValidate, sendNotificationTypeValidate } from "../../model-validators/send-notification.js";
import Notification from "../../model/notification.model.js";
import { getNotificationService, sendMailService } from "../service/SendNotificationService.js";



const sendNotificationBusiness = async (req) => {
    try {
        const { type } = req.params;
  
 
        const { error } = sendNotificationTypeValidate({type}) // validating notification type mail or sms

        if (error) {
            logger.error({method:'sendNotificationBusiness',error:error.message}) 
            return { status: 400, error: error.message }
        }
       

        if (type == 'mail') {
            req.body = { ...req.body, from: process.env.EMAIL_USER }
           const { error } = sendNotificationPayloadValidate(req.body)

           if (error) {
            logger.error({method:'sendNotificationBusiness',error:error.message}) 
            return { status: 400, error: error.message }
          }

           let response=await Notification.create({
               isEmail:true,
               isSms:false,
               status:'Initial',
               createdBy:'rishu',
               receiverNumber:null,
               receiverEmail:req.body.to,
               notificationLog:null,
               subject:req.body.subject,
           })
            sendMailService(req.body,response._id)
            return {status:200,data:response}
        } else {
            //return await sendSmsService(req)  // service for sms
        }
    } catch (error) {
        logger.error({method:'sendNotificationBusiness',error:error.message}) 
        return {
            status: 500,
            error: 'Internal Server Error'
        }
    }
}


const getNotificationBusiness=async(req)=>{
    try {
        const {notificationId}=req.params
        console.log(notificationId)
        const {error}=dbIdValider({id:notificationId})
        if (error) {
            logger.error({method:'getNotificationBusiness',error:error.message}) 
            return { status: 400, error: error.message }
        }
        return await getNotificationService(notificationId)
    } catch (error) {
        logger.error({method:'getNotificationBusiness',error:error.message}) 
        return {
            status: 500,
            error: 'Internal Server Error'
        }
    }
}

export {
    sendNotificationBusiness,
    getNotificationBusiness
}