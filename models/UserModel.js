import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Roles from "./RoleModel.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

Users.belongsTo(Roles);

export default Users;