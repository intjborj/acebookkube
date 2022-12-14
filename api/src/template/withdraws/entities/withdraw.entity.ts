import {
  ObjectType,
  Field,
  Int,
  registerEnumType,
  InputType,
} from '@nestjs/graphql';
import { CoreEntity } from '@/common/entities/core.entity';
import { Shop } from '@/template/shops/entities/shop.entity';
@InputType('WithdrawInputType', { isAbstract: true })
@ObjectType()
export class Withdraw extends CoreEntity {
  amount: number;
  status?: WithdrawStatus;
  @Field(() => Int)
  shop_id: number;
  shop?: Shop;
  payment_method: string;
  details: string;
  note: string;
}

export enum WithdrawStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  ON_HOLD = 'On hold',
  REJECTED = 'Rejected',
  PROCESSING = 'Processing',
}

registerEnumType(WithdrawStatus, {
  name: 'WithdrawStatus',
});
