const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('sqlite:db.sqlite');

// const sequelize = new Sequelize('req96760', 'jaimin', 'jaImiNPK*', {
//   host: 'localhost',
//   dialect: 'postgres',
//   port: 5432, // default port for PostgreSQL
// });

const sequelize = new Sequelize('defaultdb', 'doadmin', 'AVNS_vdeIVgKctjbWVhkGhaL', {
  host: 'db-postgresql-sfo3-39973-do-user-14041353-0.b.db.ondigitalocean.com',
  dialect: 'postgres',
  port: 25060, // default port for PostgreSQL,
  dialectOptions: {
    "ssl": {
      "require": true,
       rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  }
});


module.exports = {
  sequelize
}
