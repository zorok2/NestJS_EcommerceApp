import { DocumentBuilder } from '@nestjs/swagger';

export const CONFIG_SWAGGER = new DocumentBuilder()
  .setTitle('Ecommerce')
  .setDescription(
    'The OpenAPI specification is a language-agnostic definition format used to describe RESTful APIs. Nest provides a dedicated module which allows generating such a specification by leveraging decorators.',
  )
  .setVersion('1.0')
  .addTag('ecommerce')
  .addBearerAuth()
  .build();
