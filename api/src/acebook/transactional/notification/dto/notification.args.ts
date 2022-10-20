import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { NotifCounterEnt, NotifCounterEntSubs, NotificationEnt } from '../entities/notification.entity';

@ObjectType()
export class NotificationPaginator {
  data: NotificationEnt[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class NotifArg extends PaginationArgs {
  userId?: string;
  departmentId?: string;
}

@ObjectType()
export class NotifCounterResp {
  data: NotifCounterEnt;
  paginatorInfo: PaginatorInfo;
}

// @ObjectType()
// export class NotifCounterSubsc {
//   data?: NotifCounterEntSubs;
// }

@ObjectType()
export class NotifCounterSubsc  {
  notViewed?: number;
  departments?: string[];
  toUserId?: string;
}

@ArgsType()
export class NotifInternalArg {
  type?: string;
  departments?: string[];
  user?: string;
  userId?: string;
  fromUserId?: string;
  toUserId?: string;
  message?: string;
  entId?: string;
}

// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
