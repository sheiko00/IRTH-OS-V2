import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockPrismaService = {
    order: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    orderItem: {
      findMany: jest.fn(),
    },
    productVariant: {
      update: jest.fn(),
    },
    promoCode: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateOrderNumber', () => {
    it('should generate unique order numbers', () => {
      const orderNumber1 = service['generateOrderNumber']();
      const orderNumber2 = service['generateOrderNumber']();

      expect(orderNumber1).toMatch(/^IRTH-\d+$/);
      expect(orderNumber2).toMatch(/^IRTH-\d+$/);
    });
  });
});
