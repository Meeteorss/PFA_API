import { AppDataSource } from "../config/data-source";
import { Contact } from "../entities/Contact";

const ContactRepository = AppDataSource.getMongoRepository(Contact);
export default ContactRepository;
