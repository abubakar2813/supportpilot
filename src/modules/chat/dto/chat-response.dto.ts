import { ApiProperty } from '@nestjs/swagger';

export class ChatResponseDto {
  @ApiProperty({
    example: 'NestJS dependency injection is a design pattern...',
    description: 'AI-generated response text.',
  })
  response: string;

  @ApiProperty({ example: 'gemini-1.5-flash', description: 'Model used.' })
  model: string;

  @ApiProperty({ example: '2026-08-22T17:12:32.169Z', description: 'Timestamp of the response.' })
  timestamp: string;
}
