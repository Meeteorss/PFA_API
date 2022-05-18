import express from "express";
import { isAuth } from "../middlewares/isAuth";
import { Req } from "../types/types";
import QRCode from "qrcode";
import { ObjectId } from "mongodb";
import CoordinatesRepository from "../repositories/CoordinatesRepository";
import { generateQR } from "../utils/qrCode/generateQR";

import fs from "fs";
import path from "path";
import { s3 } from "../config/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import SharingRepository from "../repositories/SharingRepository";

export const sharingRouter = express.Router();
const emptyImagesFolder = () => {
  const directory = "./images";

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
};
sharingRouter.post("/", isAuth, async (req: Req, res) => {
  const input = { ...req.body.body };

  const id = new ObjectId(input.id.toString());
  const { sharedWith } = input;
  try {
    const coords = await CoordinatesRepository.findOneBy({
      where: {
        _id: id,
      },
    });
    if (coords) {
      const sharing = await SharingRepository.save({
        sharedWith: sharedWith,
        url: "",
        coordsId: id.toString(),
        userId: req.session.userId?.toString(),
      });

      await generateQR(sharing);

      const file = `./images/${sharing.id.toString()}.png`;
      const fileStream = fs.createReadStream(file);

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `QRCodes/${path.basename(file)}`,
        Body: fileStream,
      };
      const data = await s3.send(new PutObjectCommand(uploadParams));

      if (data.$metadata.httpStatusCode == 200) {
        // sharedCoordinates.url = `https://ez-coordinates-bucket.s3.eu-west-3.amazonaws.com/${uploadParams.Key}`;
        sharing.url = `https://ez-coordinates-bucket.s3.eu-west-3.amazonaws.com/${uploadParams.Key}`;

        await SharingRepository.save(sharing);

        // fs.unlinkSync(file);

        res.send({ sharing });
      } else {
        res.send({ error: "Failed to upload to s3" });
      }
    } else {
      res.send({ error: "Coordinates don't exist" });
    }
  } catch (err) {
    res.send({ error: err.message });
  } finally {
    emptyImagesFolder();
  }
});
