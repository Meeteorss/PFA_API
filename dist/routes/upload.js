"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const express_1 = __importDefault(require("express"));
const s3_1 = require("../config/s3");
const isAuth_1 = require("../middlewares/isAuth");
exports.uploadRouter = express_1.default.Router();
exports.uploadRouter.post("/signedUrl/", isAuth_1.isAuth, async (req, res) => {
    const bucketName = "ez-coordinates-bucket";
    const fileName = req.body.body.fileName;
    const filetype = req.body.body.fileType;
    const s3Params = {
        Bucket: bucketName,
        Key: `coordinates_pictures/${fileName}`,
        contentType: filetype,
    };
    try {
        const command = new client_s3_1.PutObjectCommand(s3Params);
        const signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3_1.s3, command, { expiresIn: 3600 });
        res.send({ signedUrl: signedUrl });
    }
    catch (err) {
        console.log("AWS ERROR ", err.message);
        res.send({ error: err.message });
    }
});
//# sourceMappingURL=upload.js.map