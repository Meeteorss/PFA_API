import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import express from "express";
import { s3 } from "../config/s3";
import { isAuth } from "../middlewares/isAuth";

export const uploadRouter = express.Router();

uploadRouter.post("/signedUrl/", isAuth, async (req, res) => {
  //Image upload
  const bucketName = "ez-coordinates-bucket";
  const fileName = req.body.body.fileName;
  const filetype = req.body.body.fileType;
  const s3Params = {
    Bucket: bucketName,
    Key: `coordinates_pictures/${fileName}`,
    contentType: filetype,
  };
  try {
    // const r = await s3.send(new PutObjectCommand(s3Params));
    // console.log("Aws response: ", r);
    // res.send(r);
    // const objectUrl = `https://${bucketName}.s3.amazonaws.com/profilepic/${fileName}`;

    const command = new PutObjectCommand(s3Params);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    res.send({ signedUrl: signedUrl });
  } catch (err) {
    console.log("AWS ERROR ", err.message);
    res.send({ error: err.message });
  }

  // end image upload
});
