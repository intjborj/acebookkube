import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { TicketCounterEnt, TicketEnt } from '../entities/ticket.entity';

@ObjectType()
export class TicketPaginator {
  data: TicketEnt[];
  paginatorInfo: PaginatorInfo;
}

@ObjectType()
export class TicketCounterResp {
  data: TicketCounterEnt;
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class TicketPaginatorArg extends PaginationArgs {
  _id?: string;
  type?: string;
  userId?: string;
  departmentId?: string;
}

// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
