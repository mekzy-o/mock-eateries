import redis from 'redis';
import { config } from 'dotenv';

config();

const { REDIS_URL } = process.env;

const client = redis.createClient(REDIS_URL);

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', error => {
  console.log(`Something went wrong ${error}`);
});

export default client;