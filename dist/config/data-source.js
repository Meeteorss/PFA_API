"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const Coordinates_1 = require("../entities/Coordinates");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Contact_1 = require("../entities/Contact");
const Sharing_1 = require("../entities/Sharing");
const SharedCoordinates_1 = require("../entities/SharedCoordinates");
exports.AppDataSource = new typeorm_1.DataSource({
    url: process.env.DB_URL,
    type: "mongodb",
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User_1.User, Coordinates_1.Coordinates, Sharing_1.Sharing, SharedCoordinates_1.SharedCoordinates, Contact_1.Contact],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map