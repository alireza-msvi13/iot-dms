import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerConfigInit } from 'src/config/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');

  app.enableVersioning({ type: VersioningType.URI }); 

  app.useGlobalPipes(new ValidationPipe())

  SwaggerConfigInit(app);

  const configService = app.get(ConfigService);
  const PORT = configService.get('CONSUMER_PORT');
  await app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    console.log(`swagger: http://localhost:${PORT}/v1/api-docs`);
  });

}
bootstrap();
