import 'dotenv/config';
import * as joi from 'joi';

interface IEnvironment {
  PORT: number;
  URl_CONNECTION_MICROSERVICE_USER: string;
  HOST_DATA_BASE: string;
  PORT_DATA_BASE: number;
  USERNAME_DATA_BASE: string;
  PASSWORD_DATA_BASE: string;
  NAME_DATA_BASE: string;
}

const environmentSchema = joi
  .object({
    PORT: joi.number().default(3000),
    URl_CONNECTION_MICROSERVICE_USER: joi.string().required(),
    HOST_DATA_BASE: joi.string().required(),
    PORT_DATA_BASE: joi.number().required(),
    USERNAME_DATA_BASE: joi.string().required(),
    PASSWORD_DATA_BASE: joi.string().required(),
    NAME_DATA_BASE: joi.string().required(),
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
  urlConnectionMicroserviceUser:
    environmentVariable.URl_CONNECTION_MICROSERVICE_USER,
  database: {
    host: environmentVariable.HOST_DATA_BASE,
    port: environmentVariable.PORT_DATA_BASE,
    username: environmentVariable.USERNAME_DATA_BASE,
    password: environmentVariable.PASSWORD_DATA_BASE,
    database: environmentVariable.NAME_DATA_BASE,
  },
};
