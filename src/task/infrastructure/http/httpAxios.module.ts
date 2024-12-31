import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { HttpRepository } from '../../application';
import { HttpAdapter } from './adapter';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: HttpRepository,
      useClass: HttpAdapter,
    },
  ],
  exports: [HttpRepository, HttpModule],
})
export class HttpAxiosModule {}
