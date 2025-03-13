import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { ConfigModule } from '@nestjs/config';
import { SignalsModule } from 'src/signals/signals.module';

@Module({
  imports: [ConfigModule.forRoot(), SignalsModule],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule { }
