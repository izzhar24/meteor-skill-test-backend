import Roles from "../models/RoleModel.js";
import Routes from "../models/RouteModel.js";

export const getRoles = async (req, res) => {
    try {
        const roles = await Roles.findAll();
        res.json(roles);
    } catch (error) {
        console.log(error);
    }
}


export const createRole = async (req, res) => {

    const name = req.body.name;
    try {
        await Roles.create({
            name: name,
        });
        res.json({
            msg: `Role ${name} berhasil ditambahkan !!`
        })
    } catch (error) {
        console.log(error);
    }
}