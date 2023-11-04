
import dotenv from 'dotenv';
dotenv.config();

const config = {
  endpoint: {
    get baseUrl() {
      if (process.env.NODE_ENV === "production") {
        return process.env.BASE_URL_LIVE
      }

      return process.env.BASE_URL_DEV
    }
  },

  port: process.env.PORT as string,
  node_env: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL as string,
}

export default config;
