import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Recipient email address.',
  })
  @IsEmail()
  to: string;

  @ApiProperty({ example: 'Chatbot Summary', description: 'Email subject.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  subject: string;

  @ApiProperty({
    example: 'Here is your chatbot conversation summary...',
    description: 'Plain text email body.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  text: string;

  @ApiPropertyOptional({
    example: '<p>Here is your chatbot conversation summary...</p>',
    description: 'Optional HTML email body.',
  })
  @IsOptional()
  @IsString()
  html?: string;
}
