import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { ServiceModule } from './service/service.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    UserModule,
    DoctorModule,
    ServiceModule,
    AppointmentModule,
    ServiceCategoryModule,
    HttpModule,
    AuthModule.forRoot({
      connectionURI:
        'https://478ee821ca1311eca762c17039e12664-eu-west-1.aws.supertokens.io:3570',
      apiKey: 'WZeezpYFERTLcW5VePeYHNxSwVWj1q',
      appInfo: {
        appName: 'web-programing-228',
        apiDomain: 'http://localhost:3000',
        websiteDomain: 'http://localhost:3000',
        apiBasePath: '/authapi',
        websiteBasePath: '/auth',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
