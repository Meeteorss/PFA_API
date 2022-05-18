"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedCoordinates = void 0;
const typeorm_1 = require("typeorm");
const Coordinates_1 = require("./Coordinates");
let SharedCoordinates = class SharedCoordinates extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], SharedCoordinates.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Coordinates_1.Coordinates)
], SharedCoordinates.prototype, "coordinates", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SharedCoordinates.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SharedCoordinates.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SharedCoordinates.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SharedCoordinates.prototype, "updatedAt", void 0);
SharedCoordinates = __decorate([
    (0, typeorm_1.Entity)()
], SharedCoordinates);
exports.SharedCoordinates = SharedCoordinates;
//# sourceMappingURL=SharedCoordinates.js.map