import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppLogger } from './app.logger';

@Module({
  imports: [HttpModule],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {
  constructor() {}
}
