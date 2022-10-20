import { DepartmentEnt } from '@/acebook/masterdata/department/entities/department.entity';
import { ApproverEnt, ApproverEntInput } from '@/acebook/referenceType/approver.entity';
import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';
import { AttachmentEnt } from '../../attachment/entities/attachment.entity';
import { CommentEnt } from '../../comment/entities/comment.entity';
import { PostEnt } from '../../post/entities/post.entity';

@ObjectType()
export class TicketEntCommon extends CoreEntityMg {

  code?: string;
  description?: string;
  type?: string;
  dateNeeded?: string;
  dateRequested?: string;
  subject?: string;
  status?: string;
  location?: string;


}

@ObjectType()
export class TicketEnt extends TicketEntCommon {
  comments: CommentEnt[];
  reactions: string[];
  works: string[];
  approvers: ApproverEnt[];
  createdBy?: UserEntAB;
  requestedBy?: UserEntAB;
  serviceDepartment?: DepartmentEnt;
  requestingDepartment?: DepartmentEnt;
  postOrigin?: PostEnt;
}

@InputType('TicketInputType', { isAbstract: true })
@ObjectType()
export class TicketInput extends TicketEntCommon {
  comments?: string;
  reactions?: string;
  works?: string;
  approvers?: ApproverEntInput[];
  postOrigin?: string;
  attachments?: string;
  createdBy?: string;
  requestedBy?: string;
  serviceDepartment?: string;
  requestingDepartment?: string;
}

@ObjectType()
export class TicketCounterEnt extends CoreEntityMg {
  forApproval?: number;
}

// @InputType('TicketInputType', { isAbstract: true })
// @ObjectType()
// export class TicketEnt extends CoreEntityMg {
//   code: string;
//   description: string;
//   type: string;
//   dateNeeded: string;
//   dateRequested: string;
//   subject: string;
//   status: string;
//   location: string;
//   createdBy: UserEntAB;
//   requestedBy: UserEntAB;
//   serviceDepartment: DepartmentEnt;
//   requestingDepartment: DepartmentEnt;
//   comments: CommentEnt[];
//   reactions: string[];
//   postOrigin: PostEnt;
//   works: string[];
//   approvers: ApproverEnt[];
//   attachments: AttachmentEnt[];
// }
