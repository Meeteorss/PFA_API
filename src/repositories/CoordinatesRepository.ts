import { Coordinates } from "../entities/Coordinates";
import { AppDataSource } from "../config/data-source";

const CoordinatesRepository = AppDataSource.getMongoRepository(Coordinates);
export default CoordinatesRepository;
