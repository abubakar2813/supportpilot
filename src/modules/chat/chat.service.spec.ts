import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { SettingsService } from '../settings/settings.service';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'GEMINI_MODEL') return 'gemini-3.6-flash';
              return null;
            }),
          },
        },
        {
          provide: SettingsService,
          useValue: {
            getSettings: jest.fn(() => ({
              businessName: 'SupportPilot',
              businessWebsite: '',
              supportEmail: 'support@example.com',
              systemPrompt: 'You are a helpful support agent.',
            })),
          },
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return fallback response when API key is missing', async () => {
    const result = await service.sendMessage({ message: 'Hello' });
    expect(result.response).toContain('AI service is not configured');
    expect(result.model).toBe('gemini-3.6-flash');
  });

  it('should list available models', () => {
    const models = service.getAvailableModels();
    expect(models.provider).toBe('Google Gemini');
    expect(models.models.length).toBeGreaterThan(0);
  });
});
