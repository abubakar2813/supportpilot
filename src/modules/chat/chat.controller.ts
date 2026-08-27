import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ChatResponseDto } from './dto/chat-response.dto';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';

@ApiTags('Chat')
@Controller('chat')
@UseInterceptors(LoggingInterceptor)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  @ApiOperation({ summary: 'Send a message to the AI chatbot' })
  @ApiResponse({
    status: 201,
    description: 'AI response generated successfully',
    type: ChatResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid request payload' })
  async sendMessage(
    @Body() sendMessageDto: SendMessageDto,
  ): Promise<ChatResponseDto> {
    return this.chatService.sendMessage(sendMessageDto);
  }

  @Get('models')
  @ApiOperation({ summary: 'List available AI models' })
  @ApiResponse({ status: 200, description: 'List of supported models' })
  getModels() {
    return this.chatService.getAvailableModels();
  }
}
