class Config {
  NODE_ENV: NODE_ENV;
  PORT: string | number | undefined;
  USERNAME: string;
  PASSWORD: string;
  HOST: string;
  DB_PORT: number;
  DATABASE: string;

  constructor(env: any) {
    this.NODE_ENV = env.NODE_ENV || "dev";
    this.PORT = this.getNumber(env.PORT);
    this.USERNAME = env.DB_USERNAME;
    this.PASSWORD = env.DB_PASSWORD;
    this.HOST = env.DB_HOST;
    this.DB_PORT = this.getNumber(env.DB_PORT);
    this.DATABASE = env.DATABASE;
  }

  getNumber(value: string | number | undefined): number {
    return Number(value);
  }
}

enum NODE_ENV {
  DEVELOPMENT = "dev",
  PRODUCTION = "prod",
  STAGING = "stage",
}

export default Config;
