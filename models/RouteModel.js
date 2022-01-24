import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Roles from './RoleModel.js';


const { DataTypes } = Sequelize;

const Routes = db.define('routes', {
    name: {
        type: DataTypes.STRING
    },
    roleId: {
        type: DataTypes.INTEGER
    },
    url: {
        type: DataTypes.STRING
    },
    method: {
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

// Routes.hasMany(Roles);

export default Routes;


