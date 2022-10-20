
import Notification from '@models/Transactionals/Notifications';
import {  NotifInternalArg } from '../dto/notification.args';
import { notifMessage } from '@/constants/notifications';

var ObjectId = require('mongoose').Types.ObjectId;
// ======= ACESSIBLE FUNCTIONS ======== //



export async function notifDepartment({ departments, user, message, entId }: NotifInternalArg) {

    if (departments) {
      let objdepts = departments.map(s => new ObjectId(s));
      // departments.map(async (item: any) => {
      let payload = {
        message: notifMessage({ type: "post_tag", fromUserName: user, message: message }),
        path: `/post/${entId}`,
        department: objdepts
      }
  
      let savedData = new Notification(payload);
      await savedData.save();
  
      return await savedData
      // })
  
      // departments.map(async (item: any) => {
      //   let payload = {
      //     message: notifDepartmentMessage({ type: "post_tag", user: user, message: message }),
      //     path: `/post/${entId}`,
      //     department: item
      //   }
  
      //   let savedData = new Notification(payload);
      //   await savedData.save();
      // })
    }
  
  
  }
  
  export async function notifComment({ departments, user, message, entId, ...data }: NotifInternalArg) {
  
    let payload = {
      message: notifMessage({ type: "post_comment", fromUserName: user, message: message }),
      path: `/post/${entId}`,
      user: data.toUserId
    }
  
    let savedData = new Notification(payload);
    await savedData.save();
  
    return await savedData
  
  }