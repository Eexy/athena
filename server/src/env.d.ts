declare namespace NodeJS{
  export interface ProcessEnv{
    PORT: string;
    JWT_KEY: string;
    NODE_ENV: string;
    ATLAS_PWD: string;
    ATLAS_USER: string;
    ORIGIN: string;
    SENDGRID_API_KEY: string;
  }
}