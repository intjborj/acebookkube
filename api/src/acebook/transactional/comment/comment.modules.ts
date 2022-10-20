import { Module } from '@nestjs/common';
import { NotificationResolver } from '../notification/notification.resolvers';
import { NotificationService } from '../notification/notification.service';
import { CommentResolver, PubSubComments } from './comment.resolvers';
import { CommentService } from './comment.service';

@Module({
  providers: [CommentResolver, CommentService, NotificationService, NotificationResolver,  {
    provide: 'PUB_SUB',
    useValue: PubSubComments,
    // useValue: new PubSub(),
  }]
})
export class CommentModule {}

