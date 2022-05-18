import { Sharing } from "../entities/Sharing";
import { AppDataSource } from "../config/data-source";

const SharingRepository = AppDataSource.getMongoRepository(Sharing);
export default SharingRepository;
