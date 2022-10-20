import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { TicketTypeEnt } from './entities/ticketType.entity';
import moment from 'moment';
// import  TicketType  from './entities/ticketType.entity';
import TicketType from '@models/Masterdata/TicketType';
import { TicketTypeId, UpsertTicketTypeInput } from './dto/ticketType.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { TicketTypePaginator, TicketTypePaginatorArg } from './dto/ticketType.args';

const objectFilters = (args: TicketTypePaginatorArg) => {
  if (args.code) {
    return { code: args.code }
  }
  return {}
}


@Injectable()
export class TicketTypeService {
  async upsert(upsertInput: UpsertTicketTypeInput): Promise<TicketTypeEnt> {
    let savedData;
    if (upsertInput.code) {
      savedData = await TicketType.findOneAndUpdate(
        { code: upsertInput.code },
        {
          $set: {
            approvers: upsertInput.approvers
          }
        },
        { new: true },
      );
    } else {
      savedData = new TicketType({
        name: upsertInput.name,
        code: upsertInput.code,
        approvers: upsertInput.approvers
      });
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: TicketTypeId): Promise<TicketTypeEnt> {
    let removedData = await TicketType.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll(payload: TicketTypePaginatorArg) {
    let filters = objectFilters(payload as TicketTypePaginatorArg);
    const ticketType: TicketTypeEnt[] = await TicketType.find(filters)
    .populate({path:"approvers", populate: {path:"departmentOnDuty", model:"Department"}})
    ;
    return {
      data: ticketType,
      paginatorInfo: paginate(
        ticketType.length,
        payload.page,
        payload.first,
        ticketType.length,
      ),
    };
  }
}
