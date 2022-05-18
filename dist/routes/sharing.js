"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharingRouter = void 0;
const express_1 = __importDefault(require("express"));
const isAuth_1 = require("../middlewares/isAuth");
const mongodb_1 = require("mongodb");
const CoordinatesRepository_1 = __importDefault(require("../repositories/CoordinatesRepository"));
const generateQR_1 = require("../utils/qrCode/generateQR");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const s3_1 = require("../config/s3");
const client_s3_1 = require("@aws-sdk/client-s3");
const SharingRepository_1 = __importDefault(require("../repositories/SharingRepository"));
exports.sharingRouter = express_1.default.Router();
const emptyImagesFolder = () => {
    const directory = "./images";
    fs_1.default.readdir(directory, (err, files) => {
        if (err)
            throw err;
        for (const file of files) {
            fs_1.default.unlink(path_1.default.join(directory, file), (err) => {
                if (err)
                    throw err;
            });
        }
    });
};
exports.sharingRouter.post("/", isAuth_1.isAuth, async (req, res) => {
    var _a;
    const input = Object.assign({}, req.body.body);
    const id = new mongodb_1.ObjectId(input.id.toString());
    const { sharedWith } = input;
    try {
        const coords = await CoordinatesRepository_1.default.findOneBy({
            where: {
                _id: id,
            },
        });
        if (coords) {
            const sharing = await SharingRepository_1.default.save({
                sharedWith: sharedWith,
                url: "",
                coordsId: id.toString(),
                userId: (_a = req.session.userId) === null || _a === void 0 ? void 0 : _a.toString(),
            });
            await (0, generateQR_1.generateQR)(sharing);
            const file = `./images/${sharing.id.toString()}.png`;
            const fileStream = fs_1.default.createReadStream(file);
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `QRCodes/${path_1.default.basename(file)}`,
                Body: fileStream,
            };
            const data = await s3_1.s3.send(new client_s3_1.PutObjectCommand(uploadParams));
            if (data.$metadata.httpStatusCode == 200) {
                sharing.url = `https://ez-coordinates-bucket.s3.eu-west-3.amazonaws.com/${uploadParams.Key}`;
                await SharingRepository_1.default.save(sharing);
                res.send({ sharing });
            }
            else {
                res.send({ error: "Failed to upload to s3" });
            }
        }
        else {
            res.send({ error: "Coordinates don't exist" });
        }
    }
    catch (err) {
        res.send({ error: err.message });
    }
    finally {
        emptyImagesFolder();
    }
});
//# sourceMappingURL=sharing.js.map