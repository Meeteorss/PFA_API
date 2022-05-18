"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRouter = void 0;
const express_1 = __importDefault(require("express"));
const ContactRepository_1 = __importDefault(require("../repositories/ContactRepository"));
const isAuth_1 = require("../middlewares/isAuth");
exports.ContactRouter = express_1.default.Router();
exports.ContactRouter.post("/", isAuth_1.isAuth, async (req, res) => {
    const input = Object.assign({}, req.body.body.input);
    const { contact_id, contact_username, contact_fullname, type } = input;
    try {
        const c = await ContactRepository_1.default.findOneBy({ where: { contact_id } });
        if (c) {
            await ContactRepository_1.default.deleteMany({});
            res.send({ error: "Contact already added" });
        }
        else {
            const contact = await ContactRepository_1.default.save({
                contact_id,
                contact_username,
                contact_fullname,
                type,
                owner_id: req.session.userId.toString(),
            });
            res.send({ contact: contact });
        }
    }
    catch (err) {
        console.log("Error creating contact: ", err.message);
        res.send({ error: "Error creating contact: " + err.message });
    }
});
exports.ContactRouter.get("/", isAuth_1.isAuth, async (req, res) => {
    var _a;
    try {
        const contacts = await ContactRepository_1.default.find({
            where: { owner_id: (_a = req.session.userId) === null || _a === void 0 ? void 0 : _a.toString() },
        });
        res.send({ contacts });
    }
    catch (err) {
        res.send({ error: err.message });
    }
});
//# sourceMappingURL=contact.js.map