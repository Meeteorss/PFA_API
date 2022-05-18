import QRCode from "qrcode";
import { SharedCoordinates } from "../../entities/SharedCoordinates";
import { Coordinates } from "../../entities/Coordinates";

export const generateQR = async (sharedCoordinates: SharedCoordinates) => {
  try {
    await QRCode.toFile(`./images/${sharedCoordinates.id.toString()}.png`, [
      {
        data: JSON.stringify(sharedCoordinates), //r
        mode: "byte",
      },
    ]);
  } catch (err) {
    console.error("Error generating QRCODE: ", err);
  }
};
