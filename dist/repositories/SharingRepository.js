"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sharing_1 = require("../entities/Sharing");
const data_source_1 = require("../config/data-source");
const SharingRepository = data_source_1.AppDataSource.getMongoRepository(Sharing_1.Sharing);
exports.default = SharingRepository;
//# sourceMappingURL=SharingRepository.js.map