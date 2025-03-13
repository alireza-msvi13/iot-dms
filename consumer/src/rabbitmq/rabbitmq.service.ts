import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { SignalService } from '../signals/signals.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQService.name);
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly queueName = 'x-ray-queue';

  constructor(
    private readonly signalsService: SignalService,
    private readonly configService: ConfigService
  ) { }

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

      this.channel.consume(this.queueName, async (message) => {
        if (message) {
          await this.processMessage(message);
        }
      });

      this.logger.log('Connected to RabbitMQ and listening for messages.');
    } catch (error) {
      this.logger.error(`RabbitMQ connection error: ${error.message}`);
      setTimeout(() => this.connectToRabbitMQ(), 5000);
    }
  }

  private async processMessage(message: amqp.ConsumeMessage) {
    try {
      const content = JSON.parse(message.content.toString());
      const deviceId = Object.keys(content)[0];
      const data = content[deviceId]?.data;

      if (!data) {
        throw new Error('Invalid x-ray data structure');
      }

      this.logger.log(`Receive x-ray data for device: ${deviceId}`);

      await this.signalsService.processAndSaveXrayData(deviceId, data);
      this.channel.ack(message);
    } catch (error) {
      this.logger.error(`Error processing x-ray data: ${error.message}`);
      this.channel.nack(message, false, false);
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
