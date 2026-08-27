import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({
    example: 'Explain NestJS dependency injection in simple terms.',
    description: 'The message sent by the user to the chatbot.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  message: string;

  @ApiPropertyOptional({
    example: 'You are a helpful software engineering tutor.',
    description: 'Optional system prompt to guide the AI behavior.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  systemPrompt?: string;
}
