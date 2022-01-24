import {Sequelize} from "sequelize";

const db = new Sequelize('meteor_test','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;