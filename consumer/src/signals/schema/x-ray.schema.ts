import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString, IsDate, IsNumber } from 'class-validator';

@Schema({ timestamps: true })
export class Xray extends Document {
  @Prop({ required: true, index: true })
  @IsString()
  deviceId: string;

  @Prop({ required: true, default: Date.now })
  @IsDate()
  time: Date;

  @Prop({ required: true })
  @IsNumber()
  dataLength: number;

  @Prop({ required: true })
  @IsNumber()
  dataVolume: number;
}

export const XraySchema = SchemaFactory.createForClass(Xray);