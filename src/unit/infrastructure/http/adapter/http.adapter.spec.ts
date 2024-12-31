import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { HttpAdapter } from '../../../../task';

describe('HttpAdapter', () => {
  let httpAdapter: HttpAdapter;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpAdapter,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    httpAdapter = module.get<HttpAdapter>(HttpAdapter);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(httpAdapter).toBeDefined();
  });

  it('should call httpService.get and return the data', (done) => {
    const result = { data: 'test' } as any;
    jest.spyOn(httpService, 'get').mockReturnValue(of(result));

    httpAdapter.get('test-url').subscribe((data) => {
      expect(data).toBe(result.data);
      done();
    });

    expect(httpService.get).toHaveBeenCalledWith('test-url');
  });
});
