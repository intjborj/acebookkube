import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { PostEnt } from '../entities/post.entity';

@ObjectType()
export class PostPaginator {
  data: PostEnt[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class PostPaginatorArg extends PaginationArgs {
  departmentId?: string;
  type?: string;
  privacy?: boolean;
  user?: string;
  _id?: string;

}





// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
