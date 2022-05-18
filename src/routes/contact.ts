import express from "express";
import ContactRepository from "../repositories/ContactRepository";
import { isAuth } from "../middlewares/isAuth";
import { Req } from "../types/types";
export const ContactRouter = express.Router();

ContactRouter.post("/", isAuth, async (req: Req, res) => {
  const input = { ...req.body.body.input };
  const { contact_id, contact_username, contact_fullname, type } = input;
  try {
    const c = await ContactRepository.findOneBy({ where: { contact_id } });
    if (c) {
      await ContactRepository.deleteMany({});
      res.send({ error: "Contact already added" });
    } else {
      const contact = await ContactRepository.save({
        contact_id,
        contact_username,
        contact_fullname,
        type,
        owner_id: req.session.userId!.toString(),
      });
      res.send({ contact: contact });
    }
  } catch (err) {
    console.log("Error creating contact: ", err.message);
    res.send({ error: "Error creating contact: " + err.message });
  }
});

ContactRouter.get("/", isAuth, async (req: Req, res) => {
  try {
    const contacts = await ContactRepository.find({
      where: { owner_id: req.session.userId?.toString() },
    });
    res.send({ contacts });
  } catch (err) {
    res.send({ error: err.message });
  }
});
