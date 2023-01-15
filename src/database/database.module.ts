import { Module, Global } from '@nestjs/common';
const API_KEY2 = '123456';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'production',
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
