import Users from "../models/UserModel.js";
import Roles from "../models/RoleModel.js";
import bcrypt from "bcrypt";
import Routes from "../models/RouteModel.js";
import jwt from "jsonwebtoken";


export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email'],
            include: [{
                model: Roles,
                attributes: ['id', 'name'],
                include: [{
                    attributes: ['id', 'name', 'url', 'method'],
                    model: Routes,
                }]
            }]
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const {
        name,
        email,
        password,
        confPassword
    } = req.body;
    if (password !== confPassword) return res.status(400).json({
        msg: "Password dan Confirm Password tidak cocok"
    });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({
            msg: "Register Berhasil"
        });
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({
            msg: "Wrong Password"
        });
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({
            userId,
            name,
            email
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({
            userId,
            name,
            email
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({
            refresh_token: refreshToken
        }, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({
            accessToken
        });
    } catch (error) {
        res.status(404).json({
            msg: error
        });
        // res.status(404).json({msg:"Email tidak ditemukan"});
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({
        refresh_token: null
    }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

export const Me = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await Users.findOne({
            attributes: ['id', 'name', 'email'],
            include: [{
                model: Roles,
                attributes: ['id', 'name'],
            }]
        }, {
            where: {
                refresh_token: refreshToken
            }
        });
        res.json({
            name: user.name,
            email: user.email,
            role: user.role.name
        });
    } catch (error) {
        console.log(error);
    }
}

export const UpdateMe = async (req, res) => {
    try {
        const name = req.body.name;
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await Users.update({
            name: name
        }, {
            where: {
                refresh_token: refreshToken
            }
        });
        res.json({
            msg: "Update profile has been succesfully !",
            data: {
                user
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const ChangePassword = async (req, res) => {
    const {
        currentPassword,
        newPassword,
        confNewPassword
    } = req.body;

    if (newPassword !== confNewPassword) return res.status(400).json({
        msg: "Password dan Confirm Password tidak cocok"
    });
    const salt = await bcrypt.genSalt();
    const hashCurrentPassword = await bcrypt.hash(currentPassword, salt);
    const hashNewPassword = await bcrypt.hash(newPassword, salt);

    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await Users.findOne({
            attributes: ['password']
        }, {
            where: {
                refresh_token: refreshToken
            }
        });
        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) return res.status(400).json({
            msg: "Password lama tidak sesuai !"
        });
        await Users.update({
            password: hashNewPassword
        }, {
            where: {
                refresh_token: refreshToken
            }
        });
        res.json({
            msg: "Change password has been succesfully !"
        });
    } catch (error) {
        console.log(error);
    }
}

export const ResetPassword = async (req, res) => {
    const {
        email
    } = req.body;
    const newPassword = "password";
    const salt = await bcrypt.genSalt();
    const hashNewPassword = await bcrypt.hash(newPassword, salt);

    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await Users.findOne({
            attributes: ['password']
        }, {
            where: {
                email: email
            }
        });
        if (user == null) return res.status(400).json({
            msg: "User tidak ditemukan !"
        });
        await Users.update({
            password: hashNewPassword
        }, {
            where: {
                email: email
            }
        });
        res.json({
            msg: "Reset password has been succesfully !",
            data: {
                newPassword: newPassword
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const Create = async (req, res) => {
    const {
        name,
        email,
        password,
        confPassword,
        roleId
    } = req.body;
    if (password !== confPassword) return res.status(400).json({
        msg: "Password dan Confirm Password tidak cocok"
    });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const users = await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            roleId: roleId
        });
        res.json({
            msg: "Data has been successfully added !!",
            data: users
        });
    } catch (error) {
        console.log(error);
    }
}

export const Show = async (req, res) => {
    const userId = req.params.id;
    try {
        const users = await Users.findByPk(userId, {
            attributes: ['id', 'name', 'email'],
            include: [{
                model: Roles,
                attributes: ['id', 'name']
            }]
        });
        res.json({
            msg: "Success !!",
            data: users
        });
    } catch (error) {
        console.log(error);
    }
}

export const Update = async (req, res) => {
    const userId = req.params.id;
    const {
        name,
        roleId
    } = req.body;
    try {
        const users = await Users.update({
            name: name,
            roleId: roleId
        }, {
            where: {
                id: userId
            }
        });
        res.json({
            msg: "Data has been successfully updated !!"
        });
    } catch (error) {
        console.log(error);
    }
}

export const Delete = async (req, res) => {
    const userId = req.params.id;
    try {
        const users = await Users.destroy({
            where: {
                id: userId
            }
        });
        res.json({
            msg: "Data has been successfully deleted !!"
        });
    } catch (error) {
        console.log(error);
    }
}

export const getPermission = async (req, res) => {

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const users = await Users.findOne({
        include: [{
            model: Roles,
            include: [{
                attributes: ['name'],
                model: Routes
            }]
        }]
    }, {
        where: {
            refresh_token: refreshToken
        }
    });
    if (users.role == null) return res.status(401).json('You dont have permission');
    const permissionList = [];
    users.role.routes.forEach(item => {
        permissionList.push(item.name);
    });
    res.status(200).json({
        msg: "success",
        data: permissionList
    });
}