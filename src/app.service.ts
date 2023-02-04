import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';
@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private ConfigService: ConfigType<typeof config>,
    @Inject('TASKS') private taks: any[],
    @Inject('PG') private clientePg: Client,
  ) {}

  getHello(): string {
    const apikey = this.ConfigService.apiKey;
    return `hellos${apikey}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientePg.query('SELECT * FROM tasks', (err, result) => {
        if (err) reject(err);
        resolve(result.rows);
      });
    });
  }
}
