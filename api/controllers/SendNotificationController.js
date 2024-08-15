import { getNotificationBusiness, sendNotificationBusiness } from "../businessLogic/SendNotificationBusiness.js"



const sendNotificationController = async (req, res, next) => {
  sendNotificationBusiness(req).then((response)=>{res.send(response)}) 

}

const getNotificationController = async (req, res, next) => {
    getNotificationBusiness(req).then((response)=>{res.send(response)}).catch((error)=>res.send(error))
  
  }




export {sendNotificationController,getNotificationController}