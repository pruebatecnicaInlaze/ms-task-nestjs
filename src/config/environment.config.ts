import 'dotenv/config';
import * as joi from 'joi';

interface IEnvironment {
  PORT: number;
}

const environmentSchema = joi
  .object({
    PORT: joi.number().default(3000),
    MONGODB_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = environmentSchema.validate(process.env);

if (error) {
  throw new Error(
    `Config validation error: ${error.message} for environment not configured`,
  );
}

const environmentVariable: IEnvironment = value;

export const environment = {
  port: environmentVariable.PORT,
};
