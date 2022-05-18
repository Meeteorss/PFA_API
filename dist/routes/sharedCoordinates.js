"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedCoordinatesRouter = void 0;
const express_1 = __importDefault(require("express"));
const isAuth_1 = require("../middlewares/isAuth");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const mongodb_1 = require("mongodb");
const SharedCoordinatesRepository_1 = __importDefault(require("../repositories/SharedCoordinatesRepository"));
exports.sharedCoordinatesRouter = express_1.default.Router();
exports.sharedCoordinatesRouter.post("/", isAuth_1.isAuth, async (req, res) => {
    var _a;
    const u = await UserRepository_1.default.findOneBy({
        where: {
            _id: new mongodb_1.ObjectId((_a = req.session.userId) === null || _a === void 0 ? void 0 : _a.toString()),
        },
    });
    const input = Object.assign(Object.assign({}, req.body.body), { user: u === null || u === void 0 ? void 0 : u.username, userId: u === null || u === void 0 ? void 0 : u.id.toString() });
    const c = input.input;
    let response = { coordinates: null, errors: [] };
    if (response.errors.length) {
        res.send(response);
    }
    else {
        response.coordinates = await SharedCoordinatesRepository_1.default.save({
            coordinates: c,
            userId: u === null || u === void 0 ? void 0 : u.id.toString(),
            user: u === null || u === void 0 ? void 0 : u.username,
        });
        res.send(response);
    }
});
exports.sharedCoordinatesRouter.get("/", isAuth_1.isAuth, async (req, res) => {
    const id = req.session.userId;
    const scs = await SharedCoordinatesRepository_1.default.find({
        where: { userId: id.toString() },
    });
    res.send({ sharedCoordinates: scs, error: null });
});
exports.sharedCoordinatesRouter.delete("/:id", isAuth_1.isAuth, async (req, res) => {
    var _a;
    const { id } = req.params;
    const sc = await SharedCoordinatesRepository_1.default.findOneBy({
        where: {
            _id: new mongodb_1.ObjectId(id),
        },
    });
    if (!sc) {
        res.send({ error: "Shared Coordinates does'nt exist." });
    }
    else {
        if (sc.userId !== ((_a = req.session.userId) === null || _a === void 0 ? void 0 : _a.toString())) {
            res.send({ error: "Not autorized." });
        }
        else {
            const re = await SharedCoordinatesRepository_1.default.remove(sc);
            if (re) {
                res.send("Deleted succesfully");
            }
            else {
                res.send({ error: "An error has occured" });
            }
        }
    }
});
//# sourceMappingURL=sharedCoordinates.js.map