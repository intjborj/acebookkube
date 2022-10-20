import { Module } from '@nestjs/common';
import { TicketResolver } from './ticket.resolvers';
import { TicketService } from './ticket.service';

@Module({
  providers: [TicketResolver, TicketService]
})
export class TicketModule {}

