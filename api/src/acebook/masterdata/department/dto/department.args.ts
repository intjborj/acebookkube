import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { DepartmentEnt } from '../entities/department.entity';

@ObjectType()
export class DepartmentPaginator {
  data: DepartmentEnt[];
  paginatorInfo: PaginatorInfo;
}



// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
