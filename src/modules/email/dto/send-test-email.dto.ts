import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendTestEmailDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Recipient email address for the test email.',
  })
  @IsEmail()
  to: string;
}
