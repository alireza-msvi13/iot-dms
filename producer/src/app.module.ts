import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    RabbitMQModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
