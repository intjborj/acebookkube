import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { NotifCounterEntSubs, NotificationEnt, NotificationEntInput } from './entities/notification.entity';
import Notification from '@models/Transactionals/Notifications';
import { NotificationId, UpsertNotificationInput } from './dto/notification.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { NotifArg, NotifCounterSubsc, NotifInternalArg } from './dto/notification.args';
import MUser from '@models/User';
import { NOTIF_COUNT_EN } from '@/acebook/constants/qgl_subscriptions/publishers';
import { PubSubNotif } from './notification.resolvers';
import { notifComment, notifDepartment } from './services/customServices';
import { notifCountFilter } from './services/filters';

var ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class NotificationService {

  async upsert(upsertInput: UpsertNotificationInput): Promise<NotificationEnt> {
    let savedData;
    if (upsertInput._id) {

      if (upsertInput.views) {
        savedData = await Notification.findOneAndUpdate(
          { _id: upsertInput._id },
          {
            $push: {
              views: {
                user: new ObjectId(upsertInput.views.user),
                viewDate: upsertInput.views.viewDate
              }
            }
          },
          { new: true },
        );
      }

    } else {
      savedData = new Notification(upsertInput);
      await savedData.save();
    }


    return savedData;
  }

  async delete(upsertInput: NotificationId): Promise<NotificationEnt> {
    let removedData = await Notification.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll({ page, first }: PaginationArgs) {
    const notification: NotificationEnt[] = await Notification.find();
    return {
      data: notification,
      paginatorInfo: paginate(
        notification.length,
        page,
        first,
        notification.length,
      ),
    };
  }

  async findByUser(payload: NotifArg) {

    // === initial ====
    // const notification: NotificationEnt[] = await Notification.find(
    //   {
    //     $or: [{ user: new ObjectId(payload.userId) }, { department: new ObjectId(payload.departmentId) }, { notifyAll: true }]
    //   }
    // ).populate({ path: 'views.user', model: 'MUser' });
    // === initial ====


    // ==== testing ====
    const notification: NotificationEnt[] = await Notification.aggregate(
      [
        {
          $match:
          {
            $or: [{ user: new ObjectId(payload.userId) }, { department: new ObjectId(payload.departmentId) }, { notifyAll: true }]
          }
        },
        {
          $project: {
            created_at: 1,
            message: 1,
            path: 1,
            views: {
              $filter: {
                input: "$views",
                as: "view",
                cond: { $eq: ["$$view.user", new ObjectId(payload.userId)] }
              }
            },
          }
        }
      ]
    );
    // .populate({ path: 'views.user', model: 'MUser' });
    // ==== testing ====

    return {
      data: notification,
      paginatorInfo: paginate(
        notification.length,
        payload.page,
        payload.first,
        notification.length,
      ),
    };
  }

  async notifCounter(payload: NotifArg) {
    const notifFA: NotificationEnt = await Notification.find(notifCountFilter(payload)).count()
    // const notifFA: NotificationEnt = await Notification.find({user: new ObjectId(payload.userId), viewDate: null}).count()

    return {
      data: {
        notViewed: notifFA
      }
    }
  }



  async notifier({ type, ...data }: NotifInternalArg) {
    let user = ""

    if (data.fromUserId) {
      let userData = MUser.findOne({ _id: data.fromUserId })
      let udataAw = await userData
      user = udataAw.firstName + ' ' + udataAw.lastName
    }

    let payload = {}
    let resNotif = {}

    switch (type) {
      case "department":
        payload = {
          user: user,
          ...data
        }
        resNotif = notifDepartment(payload)
        // console.log(payload)

        notifPublish(payload)

        break;

      case "comment":
        payload = {
          user: user,
          ...data
        }
        resNotif = notifComment(payload)
        notifPublish(payload)
        break;

      default:
        break;
    }





  }

}


async function notifPublish(payload: NotifInternalArg) {


  const viewAdd : NotifCounterSubsc = {
    notViewed: 1,
    departments: payload.departments,
    toUserId: payload.toUserId
  }

  PubSubNotif.publish(NOTIF_COUNT_EN,
    {
      subscNotifCount: viewAdd
    }
  );
}


