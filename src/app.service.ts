import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private ConfigService: ConfigType<typeof config>,
    @Inject('TASKS') private taks: any[],
  ) {}

  getHello(): string {
    const apikey = this.ConfigService.apiKey;
    return `hellos${apikey}`;
  }
}
