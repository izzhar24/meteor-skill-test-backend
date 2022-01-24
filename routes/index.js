import express from "express";
import { getUsers, Register, Login, Logout, Me, getPermission, Create, Update, Show, Delete, ChangePassword, ResetPassword, UpdateMe } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { createRole, getRoles } from "../controllers/Roles.js";
import { createRoute, getRoutes } from "../controllers/Routes.js";
import { permissionCheck } from "../middleware/PermissionCheck.js";

const router = express.Router();

router.post('/api/users', Register);
router.post('/api/login', Login);
router.get('/api/token', refreshToken);
router.delete('/api/logout', Logout);

// Profile & Password
router.get('/api/me',verifyToken,permissionCheck(['view-profile']), Me);
router.post('/api/update-me',verifyToken,permissionCheck(['update-profile']), UpdateMe);
router.post('/api/change-password',verifyToken,permissionCheck(['change-password']), ChangePassword);
router.post('/api/reset-password',verifyToken,permissionCheck(['reset-password']), ResetPassword);

// CRUD User
router.get('/api/users', verifyToken, permissionCheck(['view-list-users']),getUsers);
router.post('/api/user/create',verifyToken,permissionCheck(['create-user']),Create);
router.get('/api/user/:id',verifyToken,permissionCheck(['view-user']),Show);
router.put('/api/user/:id',verifyToken,permissionCheck(['update-user']),Update);
router.delete('/api/user/:id',verifyToken,permissionCheck(['delete-user']),Delete);

// route roles 
router.get('/api/roles',getRoles);
router.post('/api/roles',createRole);

router.post('/api/permission',verifyToken,getPermission);
// route routes 
router.get('/api/routes',verifyToken,getRoutes);
router.post('/api/routes',verifyToken,createRoute);

export default router;