import * as dotenv from 'dotenv';

dotenv.config();

export default {
  jwt: {
    secret: process.env.SECRET,
  },
};
