const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

dotenv.config({});

class Config {
  constructor() {
    this.NODE_ENV = process.env.NODE_ENV;
    this.JWT_TOKEN = process.env.JWT_TOKEN;
    this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN;
    this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT;
    this.MONGO_DB = process.env.MONGO_DB;
    this.REDIS_HOST = process.env.REDIS_HOST;
    this.CLOUD_NAME = process.env.CLOUD_NAME;
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY;
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
    this.API_GATEWAY_URL = process.env.API_GATEWAY_URL;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL;
  }

  cloudinaryConfig() {
    cloudinary.v2.config({
      cloud_name: this.CLOUD_NAME,
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET,
    });
  }
}

module.exports = new Config();
