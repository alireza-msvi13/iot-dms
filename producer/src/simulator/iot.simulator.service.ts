import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class IotSimulatorService implements OnModuleInit  {

  constructor(private readonly rabbitMQService: RabbitMQService) { }

  onModuleInit() {
    this.startSimulation();
  }

  private startSimulation() {
    setInterval(() => {
      const deviceId = `device-${Math.floor(Math.random() * 1000)}`;
      const data = this.generateXrayData();
      this.rabbitMQService.sendXrayData(deviceId, data);
    }, 10000);
  }

  private generateXrayData(): any[] {
    return Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, index) => [
      index + 1,
      [Math.random() * 100, Math.random() * 100, Math.random() * 100],
    ]);
  }
}
