import { Injectable, OnModuleInit, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQService.name);
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly queueName = 'x-ray-queue';
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.connectToRabbitMQ();
  }

  async onModuleDestroy() {
    await this.closeConnection();
  }

  private async connectToRabbitMQ() {
    try {
      const rabbitMQUrl = this.configService.get('RABBITMQ_URL');
      this.connection = await amqp.connect(rabbitMQUrl);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queueName, { durable: true });
      this.logger.log('Connected to RabbitMQ and queue asserted');
    } catch (error) {
      this.logger.error(`RabbitMQ connection error: ${error.message}`);
      setTimeout(() => this.connectToRabbitMQ(), 5000);
    }
  }

  async sendXrayData(deviceId: string, data: any[]) {
    try {
      const message = JSON.stringify({ [deviceId]: { data } });
      this.channel.sendToQueue(this.queueName, Buffer.from(message));
      this.logger.log(`Sent x-ray data for device: ${deviceId}`);
    } catch (error) {
      this.logger.error(`Failed to send message to queue: ${error.message}`);
    }
  }


  private async closeConnection() {
    try {
      await this.channel.close();
      await this.connection.close();
      this.logger.log('RabbitMQ connection closed.');
    } catch (error) {
      this.logger.error(`Error closing RabbitMQ connection: ${error.message}`);
    }
  }
}
