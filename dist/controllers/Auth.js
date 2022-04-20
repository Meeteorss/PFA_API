"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.logout = exports.registerUser = void 0;
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const argon2_1 = __importDefault(require("argon2"));
const validateInput_1 = require("../utils/validation/validateInput");
const registerUser = async (req, res, input) => {
    var _a;
    let response = {
        user: null,
        errors: await (0, validateInput_1.validateRegisterInput)(input),
    };
    if ((_a = response.errors) === null || _a === void 0 ? void 0 : _a.length) {
        res.send(response);
    }
    else {
        const hashedPassword = await argon2_1.default.hash(input.password);
        const user = await UserRepository_1.default.save(Object.assign(Object.assign({}, input), { password: hashedPassword }));
        if (!user) {
            res.send("An error has occured");
        }
        else {
            req.session.userId = user.id;
            response.user = {
                id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
            res.send(response);
        }
    }
};
exports.registerUser = registerUser;
const logout = (req, res) => {
    req.session.destroy((err) => {
        res.clearCookie("sessionID");
        if (err) {
            console.log(err);
            res.send({ value: false, message: "Error:" + err });
        }
        else {
            res.send({ value: true, message: "Logged out" });
        }
    });
};
exports.logout = logout;
const login = async (req, res, input) => {
    let response = {
        user: null,
        errors: [],
    };
    const user = await UserRepository_1.default.findOneBy({
        where: {
            $or: [
                { username: { $regex: input.login, $options: "-i" } },
                { email: { $regex: input.login, $options: "-i" } },
            ],
        },
    });
    if (!user) {
        response.errors = [
            ...response.errors,
            { field: "password", message: "Incorrect Credentials" },
        ];
        res.send(response);
    }
    else {
        const isValid = await argon2_1.default.verify(user.password, input.password);
        if (!isValid) {
            response.errors = [
                ...response.errors,
                { field: "password", message: "Incorrect Credentials" },
            ];
            res.send(response);
        }
        else {
            response.user = {
                id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
            req.session.userId = user.id;
            res.send(response);
        }
    }
};
exports.login = login;
//# sourceMappingURL=Auth.js.map