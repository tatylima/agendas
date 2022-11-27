import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Agendas')
    .setDescription('Api Agendas')
    .setVersion('1.0.0')
    .addTag('status')   // < A ORDEM PODE SER ALTERADA
    .addTag('user')    // < A ORDEM PODE SER ALTERADA
    .addTag('product')  // < A ORDEM PODE SER ALTERADA
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();