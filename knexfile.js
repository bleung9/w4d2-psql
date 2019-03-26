// Update with your config settings.

const settings = require("./settings"); // settings.json

module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: './dev.pg',
      hostname: settings.localhost,
      database: settings.database,
      user:     settings.user,
      password: settings.password,
      charset: 'utf8',

    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: settings.database,
      user:     settings.user,
      password: settings.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: settings.database,
      user:     settings.user,
      password: settings.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
