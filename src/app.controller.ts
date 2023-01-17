import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('new')
  newEndpoint(): string {
    return 'i am new network';
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
