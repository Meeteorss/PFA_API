"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coordinatesRouter = void 0;
const express_1 = __importDefault(require("express"));
const isAuth_1 = require("../middlewares/isAuth");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const mongodb_1 = require("mongodb");
const CoordinatesRepository_1 = __importDefault(require("../repositories/CoordinatesRepository"));
const isAuthAndOwner_1 = require("../middlewares/isAuthAndOwner");
const formatUser_1 = require("../utils/format/formatUser");
exports.coordinatesRouter = express_1.default.Router();
exports.coordinatesRouter.post("/", isAuth_1.isAuth, async (req, res) => {
    var _a, _b, _c, _d;
    const u = await UserRepository_1.default.findOneBy({
        where: {
            _id: new mongodb_1.ObjectId((_a = req.session.userId) === null || _a === void 0 ? void 0 : _a.toString()),
        },
    });
    const user = (0, formatUser_1.formatUser)(u);
    const input = Object.assign(Object.assign({}, req.body.body.inputs), { creator: user });
    let response = { coordinates: null, errors: [] };
    if (!((_b = input.gps) === null || _b === void 0 ? void 0 : _b.lat) || !((_c = input.gps) === null || _c === void 0 ? void 0 : _c.lng)) {
        response.errors = [
            ...response.errors,
            { field: "gps", message: "Gps coordinates are invalid" },
        ];
    }
    if (((_d = input.tags) === null || _d === void 0 ? void 0 : _d.length) == 0) {
        response.errors = [
            ...response.errors,
            { field: "tags", message: "Provide at least one tag" },
        ];
    }
    if (response.errors.length) {
        res.send(response);
    }
    else {
        response.coordinates = await CoordinatesRepository_1.default.save(input);
        res.send(response);
    }
});
exports.coordinatesRouter.put("/:id", isAuth_1.isAuth, async (req, res) => {
    const id = new mongodb_1.ObjectId(req.params.id.toString());
    const input = Object.assign({}, req.body.body.inputs);
    let c = await CoordinatesRepository_1.default.findOneBy({
        where: {
            _id: id,
        },
    });
    if (c) {
        c = Object.assign(Object.assign(Object.assign({}, c), input), { socials: [
                ...(c.socials ? c.socials : []),
                ...(input.socials ? input.socials : []),
            ], photos: [
                ...(c.photos ? c.photos : []),
                ...(input.photos ? input.photos : []),
            ] });
        const r = await CoordinatesRepository_1.default.save(c);
        res.send({ coordinates: r });
    }
    else {
        res.send({ error: "Not found" });
    }
});
exports.coordinatesRouter.get("/user/:id", isAuthAndOwner_1.isAuthAndOwner, async (req, res) => {
    const id = new mongodb_1.ObjectId(req.params.id.toString());
    const ls = await CoordinatesRepository_1.default.findAndCount({
        where: { "creator.id": id },
    });
    res.send({ count: ls[1], data: ls[0], error: null });
});
exports.coordinatesRouter.delete("/:id", isAuth_1.isAuth, async (req, res) => {
    var _a;
    const { id } = req.params;
    const c = await CoordinatesRepository_1.default.findOneBy({
        where: {
            _id: new mongodb_1.ObjectId(id),
        },
    });
    if (!c) {
        res.send("Coordinates doesn't exsit").status(404);
    }
    else {
        if (c.creator.id.toString() !== ((_a = req.session.userId) === null || _a === void 0 ? void 0 : _a.toString())) {
            res.send("Not authorized").status(401);
        }
        else {
            await CoordinatesRepository_1.default.remove(c);
            res.send("Deleted succesfully").status(200);
        }
    }
});
exports.coordinatesRouter.get("/:id", isAuth_1.isAuth, async (req, res) => {
    const { id } = req.params;
    const c = await CoordinatesRepository_1.default.findOneBy({
        where: {
            _id: new mongodb_1.ObjectId(id),
        },
    });
    if (!c) {
        res.send({ error: "Coordinates doesn't exsit" });
    }
    else {
        res.send({ coordinates: c });
    }
});
exports.coordinatesRouter.get("/", isAuth_1.isAuth, async (req, res) => {
    const ls = await CoordinatesRepository_1.default.find({});
    res.send(ls);
});
//# sourceMappingURL=coordinates.js.map