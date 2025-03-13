import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class GetXrayFilterDto {
  @ApiProperty()
  @IsOptional()
  deviceId?: string;
  @ApiProperty()
  @IsOptional()
  minDataLength?: number;
  @ApiProperty()
  @IsOptional()
  maxDataLength?: number;
  @ApiProperty()
  @IsOptional()
  minDataVolume?: number;
  @ApiProperty()
  @IsOptional()
  maxDataVolume?: number;
  @ApiProperty()
  @IsOptional()
  startTime?: string;
  @ApiProperty()
  @IsOptional()
  endTime?: string;
}
export class createXrayDataDto {
  @ApiProperty()
  deviceId: string;
  @ApiProperty()
  data: any[]
}
