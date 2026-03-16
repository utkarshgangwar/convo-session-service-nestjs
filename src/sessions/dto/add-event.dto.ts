import { IsString, IsEnum, IsObject, IsDateString, IsOptional } from 'class-validator'
import { EventType } from '../schemas/event.schema'

export class AddEventDto {

  @IsString()
  eventId: string

  @IsEnum(EventType)
  type: EventType

  @IsObject()
  payload: Record<string, any>

  @IsDateString()
  @IsOptional()
  timestamp: string
}