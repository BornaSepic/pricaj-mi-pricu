import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsRepository.save(createDepartmentDto);
  }

  findAll() {
    return this.departmentsRepository.find();
  }

  findOne(id: number) {
    return this.departmentsRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsRepository.update(id, updateDepartmentDto)
  }

  remove(id: number) {
    return this.departmentsRepository.delete(id);
  }
}
