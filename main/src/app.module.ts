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
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { parseRawEnv } from './env/schema';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { EventsModule } from './events/events.module';
import { Event } from './events/entities/event.entity';
import { RegistrationCodesModule } from './registration-codes/registration-codes.module';
import { RegistrationCode } from './registration-codes/entities/registration-code.entity';
import { EmailsService } from './emails/emails.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => parseRawEnv(config),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        Department,
        User,
        Reading,
        Report,
        Event,
        RegistrationCode
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    DepartmentsModule,
    UsersModule,
    ReadingsModule,
    ReportsModule,
    AuthModule,
    EventsModule,
    RegistrationCodesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    EmailsService
  ],
})
export class AppModule { }
