import jwt from "jsonwebtoken";
import Roles from "../models/RoleModel.js";
import Routes from "../models/RouteModel.js";
import Users from "../models/UserModel.js";


export const permissionCheck = (permission) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.sendStatus(403);
            const userId = decoded.userId;
            const users = await Users.findByPk(userId, {
                // attributes: ['id', 'name', 'email'],
                include: [{
                    model: Roles,
                    //     attributes: ['id', 'name'],
                    include: [{
                        attributes: ['name'],
                        model: Routes,
                        where: {
                            'name': permission
                        }
                    }]
                }]
            });

            if (users.role == null) return res.status(401).json('You dont have permission');
            next();
        })
    }
}