import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class OpenApi {
  public static swaggerConfig(app: INestApplication) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Microservice Nestjs Task API')
      .setDescription('Task of a microservice endpoints with Nestjs')
      .setVersion('1.0')
      .build();
    return SwaggerModule.createDocument(app, config);
  }
}
