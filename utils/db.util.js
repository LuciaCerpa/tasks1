const { Sequelize, DataTypes } = require('sequelize');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env'})

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT} = process.env;

const db = new Sequelize(`${DB_USER}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: true,
})
// const db = new Sequelize({
//     dialect: DB_USER,
//     host: DB_HOST,
//     username: DB_USER,
//     password: DB_PASSWORD,
//     port: DB_PORT,
//     database:DB_NAME,
// })

module.exports = { db, DataTypes };

