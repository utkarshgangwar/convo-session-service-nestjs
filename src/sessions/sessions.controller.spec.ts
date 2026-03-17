import { Test, TestingModule } from '@nestjs/testing';
import { SessionController } from './sessions.controller';
import { SessionService } from './sessions.service';

describe('SessionController', () => {
  let controller: SessionController;

  const mockService = {
    createSession: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [
        {
          provide: SessionService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<SessionController>(SessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});