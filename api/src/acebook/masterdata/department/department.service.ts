import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { DepartmentEnt } from './entities/department.entity';
import moment from 'moment';
// import  Department  from './entities/department.entity';
import Department from '../../../../models/Masterdata/Department';
import {   DepartmenId, UpsertDepartmentInput } from './dto/department.input';
import { PaginationArgs } from '@/common/dto/pagination.args';

@Injectable()
export class DepartmentService {
  async upsert(upsertInput: UpsertDepartmentInput): Promise<DepartmentEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await Department.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
      savedData = new Department({
        name: upsertInput.name,
        description: upsertInput.description,
      });
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: DepartmenId): Promise<DepartmentEnt> {
    let removedData = await Department.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll({ page, first }: PaginationArgs) {
    const department: DepartmentEnt[] = await Department.find();
    return {
      data: department,
      paginatorInfo: paginate(
        department.length,
        page,
        first,
        department.length,
      ),
    };
  }
}
