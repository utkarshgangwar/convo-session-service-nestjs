import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from './sessions.service';
import { SessionRepository } from './sessions.repository';
import { MongoServerError } from 'mongodb';

describe('SessionService', () => {
  let service: SessionService;

  const mockRepo = {
    upsertSession: jest.fn(),
    findSession: jest.fn(),
    addEvent: jest.fn(),
    findEvent: jest.fn(),
    getEvents: jest.fn(),
    completeSession: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: SessionRepository,
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<SessionService>(SessionService);

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return existing session (idempotent create)', async () => {
    mockRepo.upsertSession.mockResolvedValue({
      sessionId: 'test-123',
    });

    const result = await service.createSession({
      sessionId: 'test-123',
      language: 'en',
    } as any);

    expect(result.sessionId).toBe('test-123');
    expect(mockRepo.upsertSession).toHaveBeenCalled();
  });

  it('should handle duplicate event gracefully', async () => {
    mockRepo.findSession.mockResolvedValue({
      status: 'active',
    });

    // Mongo error instance
    const mongoError = new MongoServerError({
      message: 'duplicate key error',
    } as any);
    mongoError.code = 11000;

    mockRepo.addEvent.mockRejectedValue(mongoError);

    mockRepo.findEvent.mockResolvedValue({
      eventId: 'e1',
    });

    const result = await service.addEvent(
      's1',
      { eventId: 'e1' } as any,
    );

    expect(result.eventId).toBe('e1');
    expect(mockRepo.findEvent).toHaveBeenCalledWith('s1', 'e1');
  });
});