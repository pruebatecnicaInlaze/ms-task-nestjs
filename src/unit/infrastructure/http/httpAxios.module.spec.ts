import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { HttpAdapter, HttpAxiosModule, HttpRepository } from '../../../task';

describe('HttpAxiosModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HttpAxiosModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should import HttpModule', () => {
    const httpModule = module.get(HttpModule);
    expect(httpModule).toBeDefined();
  });

  it('should provide HttpRepository', () => {
    const httpRepository = module.get(HttpRepository);
    expect(httpRepository).toBeDefined();
    expect(httpRepository).toBeInstanceOf(HttpAdapter);
  });
});
