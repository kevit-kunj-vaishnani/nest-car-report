import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cookieSession({
      keys: ['asdfasfd'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(3000);
}
bootstrap();

/*
    whitelist: true = this property will make sure we get only that fields which we are expecting.

    example = if our handler expects email and password properties, 
              but a request also includes an age property, 
              this property will be automatically removed from the resulting DTO.

    -------------------------------------------------------------------------------------------------------------
    
    (whitelist: true) 
          & 
    (forbidNonWhitelisted: true) = will result into = we have to only specified fields that handlr expects. if we give more it will give error.
    
    if we gonts give which it expext then also it will give error.
    so we have to give only required fields
*/
