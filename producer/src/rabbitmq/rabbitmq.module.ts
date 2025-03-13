import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { IotSimulatorService } from '../simulator/iot.simulator.service';

@Module({
  providers: [RabbitMQService, IotSimulatorService],
})
export class RabbitMQModule {}
