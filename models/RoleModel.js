import {
    Sequelize
} from 'sequelize';
import db from '../config/Database.js';
import Routes from './RouteModel.js';


const {
    DataTypes
} = Sequelize;

const Roles = db.define('roles', {
    name: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

Roles.hasMany(Routes);

export default Roles;