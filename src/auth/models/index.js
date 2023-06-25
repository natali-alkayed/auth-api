require('dotenv').config();
const { TextEncoder } = require('text-encoding');
const userModel = require('./users.js');
const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('../../models/ clothes/model.js');
const foodModel = require('../../models/food/ model.js');
const Collection = require('../../models/data-collections.js');
const DATABASE_URL = process.env.DATABASE_URL || 'sqlit:memory;';
const sequelize = new Sequelize(DATABASE_URL, {});
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  food: new Collection(food),
  clothes: new Collection(clothes),
}