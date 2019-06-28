require('dotenv').config();
const knex = require('knex');
const ShoppingService = require('./shopping-list-service');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

console.log(ShoppingService.getAllShoppingItems());