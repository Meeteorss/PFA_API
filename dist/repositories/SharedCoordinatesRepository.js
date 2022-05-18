"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const SharedCoordinates_1 = require("../entities/SharedCoordinates");
const SharedCoordinatesRepository = data_source_1.AppDataSource.getMongoRepository(SharedCoordinates_1.SharedCoordinates);
exports.default = SharedCoordinatesRepository;
//# sourceMappingURL=SharedCoordinatesRepository.js.map