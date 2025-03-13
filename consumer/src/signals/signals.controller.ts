import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Query,
  Res,
} from '@nestjs/common';
import { SignalService } from './signals.service';
import { Xray } from './schema/x-ray.schema';
import { createXrayDataDto, GetXrayFilterDto } from './dto/xray.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('signals')
export class SignalsController {
  constructor(private readonly signalService: SignalService) { }

  @Get()
  @ApiOperation({ summary: "get all xrays with filter" })
  async getAllXrays(@Query() filterDto: GetXrayFilterDto): Promise<Xray[]> {
    return this.signalService.getAllXrays(filterDto);
  }

  @Post()
  @ApiOperation({ summary: "create a xray data" })
  async createXray(
    @Body() createXrayDataDto: createXrayDataDto,
  ): Promise<Xray> {
    return this.signalService.processAndSaveXrayData(createXrayDataDto.deviceId, createXrayDataDto.data);
  }

  @Delete('/:deviceId')
  @ApiOperation({ summary: "delete a xray data" })
  async deleteXray(
    @Param('deviceId')
    @Res() res: Response,
    deviceId: string
  ) {
    await this.signalService.deleteXray(deviceId,res);
  }
}
