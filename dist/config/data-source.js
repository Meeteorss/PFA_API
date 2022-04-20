"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const Coordinates_1 = require("../entities/Coordinates");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const SharedCoordinates_1 = require("../entities/SharedCoordinates");
exports.AppDataSource = new typeorm_1.DataSource({
    url: "mongodb://localhost:27017",
    type: "mongodb",
    database: "PFA",
    synchronize: true,
    logging: true,
    entities: [User_1.User, Coordinates_1.Coordinates, SharedCoordinates_1.SharedCoordinates],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map