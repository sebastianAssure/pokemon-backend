import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS_OPTIONS } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CORS_OPTIONS);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
