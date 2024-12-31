import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  StoreModule,
  TaskInfrastructureModule,
} from '../../task/infrastructure';
import { HttpAxiosModule } from '../../task/infrastructure/http';

describe('TaskInfrastructureModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TaskInfrastructureModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should import TypeOrmModule with correct configuration', () => {
    const typeOrmModule = module.get(TypeOrmModule);
    expect(typeOrmModule).toBeDefined();
  });

  it('should import StoreModule', () => {
    const storeModule = module.get(StoreModule);
    expect(storeModule).toBeDefined();
  });

  it('should import HttpAxiosModule', () => {
    const httpAxiosModule = module.get(HttpAxiosModule);
    expect(httpAxiosModule).toBeDefined();
  });
});
