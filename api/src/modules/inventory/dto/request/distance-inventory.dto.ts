/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class DistanceDto {
  @IsNotEmpty()
  inventoryId: string;

  distance: number;
}
