"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const isAuth_1 = require("../middlewares/isAuth");
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const mongodb_1 = require("mongodb");
const formatUser_1 = require("../utils/format/formatUser");
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/:id", isAuth_1.isAuth, async (req, res) => {
    try {
        const user = await UserRepository_1.default.findOneBy(new mongodb_1.ObjectId(req.params.id.toString()));
        if (user) {
            res.send({ user: (0, formatUser_1.formatUser)(user) });
        }
        else {
            res.send({ error: "User not found" });
        }
    }
    catch (err) {
        res.send({ error: err.message });
    }
});
exports.userRouter.get("/username/:username", isAuth_1.isAuth, async (req, res) => {
    try {
        const user = await UserRepository_1.default.findOneBy({
            where: { username: { $regex: req.params.username, $options: "-i" } },
        });
        if (user) {
            res.send({ user: (0, formatUser_1.formatUser)(user) });
        }
        else {
            res.send({ error: "User not found" });
        }
    }
    catch (err) {
        res.send({ error: err.message });
    }
});
exports.userRouter.get("/", async (req, res) => {
    const data = await UserRepository_1.default.find();
    res.send({ users: data });
});
exports.userRouter.get("/private", isAuth_1.isAuth, (req, res) => {
    res.send("Private route");
});
exports.userRouter.post("/", async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;
    const user = new User_1.User();
    user.username = username;
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;
    const UserRepo = data_source_1.AppDataSource.getMongoRepository(User_1.User);
    const us = await User_1.User.find();
    await User_1.User.remove(us);
    const u = await UserRepo.save(user);
    console.log(u);
    res.send(u);
});
//# sourceMappingURL=users.js.map