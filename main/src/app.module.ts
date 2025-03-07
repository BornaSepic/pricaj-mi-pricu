import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from './departments/departments.module';
import { Department } from './departments/entities/department.entity';
import { UsersModule } from './users/users.module';
import { ReadingsModule } from './readings/readings.module';
import { User } from './users/entities/user.entity';
import { Reading } from './readings/entities/reading.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        Department,
        User,
        Reading
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    DepartmentsModule,
    UsersModule,
    ReadingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
