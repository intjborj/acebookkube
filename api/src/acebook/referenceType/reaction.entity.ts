import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntityMg } from '@/common/entities/core.entity';
import { ReactionIconDetailEnt } from '../masterdata/reactionIconDetails/entities/reactionIconDetail.entity';

@InputType('ReactionInputType', { isAbstract: true })
@ObjectType()
export class ReactionEnt extends CoreEntityMg {
  reactionIconDetails: ReactionIconDetailEnt;
  user: UserEntAB;
}


