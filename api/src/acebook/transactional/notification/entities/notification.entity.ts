import { DepartmentEnt } from '@/acebook/masterdata/department/entities/department.entity';
import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';


// @ObjectType()
// export class NotificationEntCommon extends CoreEntityMg {
//   message: string;
//   viewDate?: string;
//   path: string;
//   user: UserEntAB;
// }

@ObjectType()
export class NotifViewEnt {
  user?: UserEntAB;
  viewDate?: string;
}

@InputType('NotifInputType', { isAbstract: true })
@ObjectType()
export class NotifViewInput {
  user?: string;
  viewDate?: string;
}


@ObjectType()
export class NotificationEntCommon extends CoreEntityMg {
  message?: string;
  path?: string;
  notifyAll?: boolean;
}

@ObjectType()
export class NotificationEnt extends NotificationEntCommon {
  views?: NotifViewEnt[];
  user?: UserEntAB;
  department: DepartmentEnt[];
}

@InputType('NotificationInputType', { isAbstract: true })
@ObjectType()
export class NotificationEntInput extends NotificationEntCommon {
  views?: NotifViewInput;
  user?: string;
  department?: string[];
}

@ObjectType()
export class NotifCounterEnt extends CoreEntityMg {
  notViewed?: number;
}

@ObjectType()
export class NotifCounterEntSubs {
  notViewed?: number;
}
