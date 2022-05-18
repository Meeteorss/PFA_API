"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQR = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const generateQR = async (sharedCoordinates) => {
    try {
        await qrcode_1.default.toFile(`./images/${sharedCoordinates.id.toString()}.png`, [
            {
                data: JSON.stringify(sharedCoordinates),
                mode: "byte",
            },
        ]);
    }
    catch (err) {
        console.error("Error generating QRCODE: ", err);
    }
};
exports.generateQR = generateQR;
//# sourceMappingURL=generateQR.js.map