"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.prodRouter = express_1.default.Router();
exports.prodRouter.get("/", (req, res) => {
    console.log("Prods route");
    res.send("Prods");
});
//# sourceMappingURL=prods.js.map