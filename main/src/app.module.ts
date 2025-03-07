import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from './departments/departments.module';
import { UsersModule } from './users/users.module';
import { ReadingsModule } from './readings/readings.module';
import { Department } from './departments/entities/department.entity';
import { User } from './users/entities/user.entity';
import { Reading } from './readings/entities/reading.entity';
import { Report } from './reports/entities/report.entity';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        Department,
        User,
        Reading,
        Report
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    DepartmentsModule,
    UsersModule,
    ReadingsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
