import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { TicketEnt } from './entities/ticket.entity';
import moment from 'moment';
// import  Ticket  from './entities/ticket.entity';
import Ticket from '@models/Transactionals/Tickets';
import { TicketId, UpsertTicketInput } from './dto/ticket.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import Post from '@models/Transactionals/Posts';
import { TicketPaginatorArg } from './dto/ticket.args';

const objectFilters = (args: TicketPaginatorArg) => {
  if (args._id) {
    // SPECIFIC TICKET
    return { _id: args._id }

  } else if (args.userId && args.type == "FOR_APPROVAL") {
    // === FOR APPROVAL ===
    // SPECIFIC APPROVER AND FOR APPROVAL TICKETS (PENDING AND DISAPPROVED)
    return {

      $or: [
        { approvers: { $elemMatch: { 'user': args.userId, 'status': 'pending' } } },
        { approvers: { $elemMatch: { 'user': args.userId, 'status': 'disapproved' } } },
      ]

    }

  } else if (args.userId && args.type == "APPROVED") {
    // === APPROVED ===
    // APPROVED BY SPECIFIC APPROVER
    return { approvers: { $elemMatch: { 'user': args.userId, 'status': 'approved' } } }
  
  }else if (args.userId && args.type == "ALL_APPR_ASSIG") {
    // === ALL APPROVER'S ASSIGNATORY ===
    // ALL TICKETS ASSIGNED TO APPROVER
    return { approvers: { $elemMatch: { 'user': args.userId } } }
  
  }else if (args.userId && args.type == "MY_REQUESTS") {
    // === MY REQUESTS ===
    // ALL REQUESTED TICKETS
    return { requestedBy: args.userId }
  
  }else if (args.departmentId && args.type == "DEPARTMENT_TICKETS") {
    // === DEPARTMENT TICKETS ===
    // ALL TICKETS OF DEPARTMENT
    return { serviceDepartment: args.departmentId }
  
  } else {
    // DEFAULT (ALL)
    return {}
  }

}

@Injectable()
export class TicketService {
  async upsert(upsertInput: UpsertTicketInput): Promise<TicketEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await Ticket.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
      savedData = new Ticket(upsertInput);
      //  savedData = new Ticket({
      //   subject: upsertInput.subject,
      //   description: upsertInput.description,
      // });
      await savedData.save();


      if (upsertInput.postOrigin) {
        await Post.findOneAndUpdate(
          { _id: upsertInput.postOrigin },
          { $set: { ticket: savedData._id } },
          { new: true },
        )
      }
    }

    return savedData;
  }

  async delete(upsertInput: TicketId): Promise<TicketEnt> {
    let removedData = await Ticket.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findEnt(payload: TicketPaginatorArg) {
    let filters = objectFilters(payload as TicketPaginatorArg);
    const ticket: TicketEnt[] = await Ticket.find(filters)
      .populate('requestingDepartment')
      .populate('serviceDepartment')
      .populate('createdBy')
      .populate('requestedBy')
      .populate('postOrigin')
      .populate({ path: 'approvers.user', model: 'MUser', populate: { path: 'departmentOnDuty', model: 'Department' } })
      ;
    return {
      data: ticket,
      paginatorInfo: paginate(
        ticket.length,
        payload.page,
        payload.first,
        ticket.length,
      ),
    };
  }


  async ticketCounter(payload: TicketPaginatorArg){
    let filtersFA = objectFilters({userId: payload.userId, type: "FOR_APPROVAL"});
    const ticketFA: TicketEnt[] = await Ticket.find(filtersFA).count()

   

    return {
      data: {
        forApproval: ticketFA
      }
    }
  }

}
