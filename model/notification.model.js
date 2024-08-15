import mongoose from "mongoose";

const notificationSchema=new mongoose.Schema({
    isEmail:{type:Boolean,require:true},
    isSms:{type:Boolean,require:true},
    status:{type:String,require:true},
    createdBy:{type:String,require:true},
    receiverNumber:{type:Number},
    receiverEmail:{type:String},
    notificationLog:{type:String},
    subject:{type:String}
},{timestamps:true})


const Notification=mongoose.model("notification",notificationSchema);

export default Notification;