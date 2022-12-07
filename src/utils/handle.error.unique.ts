import { UnprocessableEntityException } from '@nestjs/common';

export const handleErrorUnique = (error: Error): never => {
  const splitedMessage = error.message.split('`');

  const errorMenssage = `input ${
    splitedMessage[splitedMessage.length - 2]
  } is not a single constraint UNIQUE`;

  throw new UnprocessableEntityException(errorMenssage);
};