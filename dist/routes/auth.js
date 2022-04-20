"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const Auth_1 = require("../controllers/Auth");
const mongodb_1 = require("mongodb");
exports.authRouter = express_1.default.Router();
exports.authRouter.post("/login", (req, res) => {
    (0, Auth_1.login)(req, res, req.body.body);
});
exports.authRouter.post("/logout", (req, res) => {
    (0, Auth_1.logout)(req, res);
});
exports.authRouter.post("/register", async (req, res) => {
    (0, Auth_1.registerUser)(req, res, req.body.body);
});
exports.authRouter.get("/", async (req, res) => {
    if (req.session.userId) {
        const user = await UserRepository_1.default.findOneBy({
            where: {
                _id: new mongodb_1.ObjectId(req.session.userId),
            },
        });
        if (user) {
            res.send({
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            });
        }
        else {
            res.send({ user: null });
        }
    }
    else {
        res.send({ user: null });
    }
});
//# sourceMappingURL=auth.js.map