"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coordinates_1 = require("../entities/Coordinates");
const data_source_1 = require("../config/data-source");
const CoordinatesRepository = data_source_1.AppDataSource.getMongoRepository(Coordinates_1.Coordinates);
exports.default = CoordinatesRepository;
//# sourceMappingURL=CoordinatesRepository.js.map