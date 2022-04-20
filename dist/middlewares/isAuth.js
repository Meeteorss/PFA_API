"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const mongodb_1 = require("mongodb");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const isAuth = async (req, res, next) => {
    if (!req.session.userId) {
        res.send("Not Authenticated");
    }
    else {
        const user = await UserRepository_1.default.findOneBy({
            where: {
                _id: new mongodb_1.ObjectId(req.session.userId.toString()),
            },
        });
        if (!user) {
            res.send("Not Authenticated");
        }
        else {
            next();
        }
    }
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map