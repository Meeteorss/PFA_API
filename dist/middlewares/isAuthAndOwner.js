"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthAndOwner = void 0;
const mongodb_1 = require("mongodb");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const isAuthAndOwner = async (req, res, next) => {
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
            const paramId = new mongodb_1.ObjectId(req.params.id.toString());
            const sessionId = user.id;
            if (paramId.toString() !== sessionId.toString()) {
                console.log("param id: ", paramId);
                console.log("session id:", sessionId);
                res.send({ error: "You cannot get these infos" });
            }
            else {
                next();
            }
        }
    }
};
exports.isAuthAndOwner = isAuthAndOwner;
//# sourceMappingURL=isAuthAndOwner.js.map