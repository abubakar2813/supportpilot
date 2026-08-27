import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class ChatMessageDto {
  @ApiProperty({ example: 'user', description: 'Message sender role.' })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    example: 'What pricing plans do you offer?',
    description: 'Message text.',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class ChatSummaryDto {
  @ApiProperty({
    example: 'support@example.com',
    description: 'Email address to send the conversation summary to.',
  })
  @IsEmail()
  to: string;

  @ApiProperty({
    description: 'Array of chat messages to summarize.',
    type: [ChatMessageDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  messages: ChatMessageDto[];
}
