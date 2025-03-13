import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Xray } from './schema/x-ray.schema';
import { GetXrayFilterDto } from './dto/xray.dto';
import { Response } from 'express';

@Injectable()
export class SignalService {
  constructor(@InjectModel('Xray') private xrayModel: Model<Xray>) {}

  async processAndSaveXrayData(deviceId: string, data: any[]): Promise<Xray> {
    if (!Array.isArray(data)) {
      throw new BadRequestException('Invalid x-ray data format');
    }

    const dataLength = data.length;
    const dataVolume = data.reduce((sum, entry) => sum + entry[1][2], 0);

    const xrayDocument = new this.xrayModel({
      deviceId,
      time: new Date(),
      dataLength,
      dataVolume,
    });

    return xrayDocument.save();
  }
  async getAllXrays(filterDto: GetXrayFilterDto): Promise<Xray[]> {
    const {
      deviceId,
      minDataLength,
      maxDataLength,
      minDataVolume,
      maxDataVolume,
      startTime,
      endTime,
    } = filterDto;

    const query: any = {};

    if (deviceId) {
      query.deviceId = deviceId;
    }

    if (minDataLength !== undefined || maxDataLength !== undefined) {
      query.dataLength = {};
      if (minDataLength !== undefined) {
        query.dataLength.$gte = minDataLength;
      }
      if (maxDataLength !== undefined) {
        query.dataLength.$lte = maxDataLength;
      }
    }

    if (minDataVolume !== undefined || maxDataVolume !== undefined) {
      query.dataVolume = {};
      if (minDataVolume !== undefined) {
        query.dataVolume.$gte = minDataVolume;
      }
      if (maxDataVolume !== undefined) {
        query.dataVolume.$lte = maxDataVolume;
      }
    }

    if (startTime || endTime) {
      query.time = {};
      if (startTime) {
        const parsedStart = new Date(startTime);
        if (!isNaN(parsedStart.getTime())) {
          query.time.$gte = parsedStart;
        }
      }
      if (endTime) {
        const parsedEnd = new Date(endTime);
        if (!isNaN(parsedEnd.getTime())) {
          query.time.$lte = parsedEnd;
        }
      }
      if (Object.keys(query.time).length === 0) {
        delete query.time;
      }
    }

    return this.xrayModel.find(query).exec();
  }
  async deleteXray(deviceId: string,res:Response): Promise<Response> {
    const result = await this.xrayModel.deleteOne({ deviceId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        `X-ray record with deviceId ${deviceId} not found`,
      );
    }
    return res
    .status(HttpStatus.OK)
    .json({
        message: "Xray data deleted successfully",
        statusCode: HttpStatus.OK
    })
    
  }
}
