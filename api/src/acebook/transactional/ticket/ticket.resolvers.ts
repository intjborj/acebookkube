import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { TicketService } from './ticket.service';
import { TicketId, UpsertTicketInput } from './dto/ticket.input';
import { TicketCounterResp, TicketPaginator, TicketPaginatorArg} from './dto/ticket.args';
import { TicketEnt } from './entities/ticket.entity';

@Resolver(() => TicketEnt)
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Mutation(() => TicketEnt)
  async upsertTicket(
    @Args('input') upsertInput: UpsertTicketInput,
  ): Promise<TicketEnt> {

    return this.ticketService.upsert(upsertInput);
  }

  @Mutation(() => TicketEnt)
  async deleteTicket(
    @Args('input') deleteInput: TicketId,
  ): Promise<TicketEnt> {

    return this.ticketService.delete(deleteInput);
  }

  @Query(() => TicketPaginator, { name: 'tickets' })
  getTags(@Args() getArgs: TicketPaginatorArg) {
    return this.ticketService.findEnt(getArgs);
  }

@Query(() => TicketCounterResp, { name: 'ticketCounts' })
  getTicketCounts(@Args() getArgs: TicketPaginatorArg) {
    return this.ticketService.ticketCounter(getArgs);
  }

 

 
}
