const Knex = require('knex');
const knexConfig = require('./knexfile.js');
const environment = process.env.NODE_ENV || 'development';
console.log(environment)
module.exports = Knex(knexConfig[environment]); 