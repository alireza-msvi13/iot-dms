import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignalService } from './signals.service';
import { SignalsController } from './signals.controller';
import { XraySchema } from './schema/x-ray.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Xray', schema: XraySchema }])],
  controllers: [SignalsController],
  providers: [SignalService],
  exports: [SignalService],
})
export class SignalsModule {}
