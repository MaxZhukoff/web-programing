import { Controller, Get, Render, Session, UseGuards } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { optionalAuthGuard } from './auth/optionalAuthGuard';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';
import { AuthGuard } from './auth/auth.guard';
import { Role } from '@prisma/client';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  @Get('/')
  @Render('index')
  @UseGuards(optionalAuthGuard)
  async getIndex(@Session() session: SessionContainer) {
    if (session != undefined) {
      const userId = session.getUserId();
      const userInfo = await ThirdPartyEmailPassword.getUserById(userId);
      return { email: userInfo.email };
    } else return { email: '' };
  }

  @Get('/sign_up_for_an_appointment')
  @Render('sign_up_for_an_appointment')
  @UseGuards(optionalAuthGuard)
  async admin(@Session() session: SessionContainer) {
    if (session != undefined) {
      const userId = session.getUserId();
      const userInfo = await ThirdPartyEmailPassword.getUserById(userId);
      return { email: userInfo.email };
    } else return { email: '' };
  }

  @Get('/doctors')
  @Render('doctors')
  @UseGuards(optionalAuthGuard)
  async doctors(@Session() session: SessionContainer) {
    if (session != undefined) {
      const userId = session.getUserId();
      const userInfo = await ThirdPartyEmailPassword.getUserById(userId);
      return { email: userInfo.email };
    } else return { email: '' };
  }

  @Get('/lk')
  @Render('lk')
  @UseGuards(AuthGuard)
  async lk(@Session() session: SessionContainer) {
    if (session != undefined) {
      const userId = session.getUserId();
      const userInfo = await ThirdPartyEmailPassword.getUserById(userId);
      const role = session.getAccessTokenPayload()['role'];
      if (role == Role.ADMIN) return { email: userInfo.email, role: 'ADMIN' };
      else if (role == Role.DOCTOR)
        return { email: userInfo.email, role: 'DOCTOR' };
      else if (role == Role.USER)
        return { email: userInfo.email, role: 'USER' };
    } else return { email: '', role: '' };
  }

  @Get('/Prices_and_services')
  @Render('Prices_and_services')
  @UseGuards(optionalAuthGuard)
  async Prices_and_services(@Session() session: SessionContainer) {
    if (session != undefined) {
      const userId = session.getUserId();
      const userInfo = await ThirdPartyEmailPassword.getUserById(userId);
      return { email: userInfo.email };
    } else return { email: '' };
  }

  @Get('/timetable')
  @Render('timetable')
  @UseGuards(optionalAuthGuard)
  async timetable(@Session() session: SessionContainer) {
    if (session != undefined) {
      const userId = session.getUserId();
      const userInfo = await ThirdPartyEmailPassword.getUserById(userId);
      return { email: userInfo.email };
    } else return { email: '' };
  }

  @Get('/auth/callback/github')
  @Render('callback')
  getCallback() {
    return { user: 'You are logged already' };
  }
}
