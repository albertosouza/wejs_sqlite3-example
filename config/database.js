const path = require('path');

module.exports.database = {
  prod: {
    // other diferent config for prod env
    uri: process.env.DATABASE_URL,
    dialect: 'postgres',
    protocol: 'postgres'
  },
  dev: {
    dialect: 'sqlite',
    // dev.sqlite file in root folder
    storage: path.join(process.cwd(), 'dev.sqlite')
  },
  test: {
    dialect: 'sqlite',
    // test.sqlite file in root folder
    storage: path.join(process.cwd(), 'test.sqlite')
  }
};
