import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SettingsService } from '../settings/settings.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ChatResponseDto } from './dto/chat-response.dto';

@Injectable()
export class ChatService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly modelName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly settingsService: SettingsService,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      console.warn(
        'GEMINI_API_KEY is not set. Chat endpoints will return fallback responses.',
      );
    } else {
      const masked = apiKey.length > 8 ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : 'set';
      console.log(`GEMINI_API_KEY loaded: ${masked}`);
    }
    this.genAI = new GoogleGenerativeAI(apiKey || '');
    this.modelName = this.configService.get<string>(
      'GEMINI_MODEL',
      'gemini-1.5-flash-latest',
    );
    console.log(`Gemini model configured: ${this.modelName}`);
  }

  async sendMessage(sendMessageDto: SendMessageDto): Promise<ChatResponseDto> {
    const { message, systemPrompt } = sendMessageDto;

    if (!message || !message.trim()) {
      throw new BadRequestException('Message cannot be empty.');
    }

    const apiKey = this.configService.get<string>('GEMINI_API_KEY');

    // Graceful fallback when no API key is configured (useful for local demo)
    if (!apiKey) {
      return {
        response:
          'AI service is not configured. Please set GEMINI_API_KEY in your environment variables.',
        model: this.modelName,
        timestamp: new Date().toISOString(),
      };
    }

    const settings = this.settingsService.getSettings();
    const effectiveSystemPrompt = systemPrompt || settings.systemPrompt;

    try {
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        systemInstruction: effectiveSystemPrompt,
      });

      const result = await model.generateContent(message);
      const response = await result.response;
      const text = response.text();

      return {
        response: text,
        model: this.modelName,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage =
        error?.message || error?.errorDetails?.[0]?.description || 'Unknown error';
      const errorCode = error?.status || error?.code || 'N/A';
      console.error(`Gemini API error [${errorCode}]:`, errorMessage, error);
      throw new InternalServerErrorException(
        `AI request failed (${errorCode}): ${errorMessage}`,
      );
    }
  }

  getAvailableModels() {
    return {
      provider: 'Google Gemini',
      models: [
        { id: 'gemini-1.5-flash-latest', name: 'Gemini 1.5 Flash (fast & cheap)' },
        { id: 'gemini-1.5-pro-latest', name: 'Gemini 1.5 Pro (advanced reasoning)' },
        { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (stable)' },
        { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (stable)' },
      ],
      default: this.modelName,
    };
  }
}
