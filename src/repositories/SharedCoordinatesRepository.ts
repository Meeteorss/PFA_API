import { AppDataSource } from "../config/data-source";
import { SharedCoordinates } from "../entities/SharedCoordinates";

const SharedCoordinatesRepository =
  AppDataSource.getMongoRepository(SharedCoordinates);
export default SharedCoordinatesRepository;
