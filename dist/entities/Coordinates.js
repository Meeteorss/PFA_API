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
exports.Coordinates = exports.AdditionalInfos = exports.Address = exports.SocialMedia = exports.Photo = exports.Geoposition = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
class Geoposition {
}
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Geoposition.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Geoposition.prototype, "lng", void 0);
exports.Geoposition = Geoposition;
class Photo {
}
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Photo.prototype, "url", void 0);
exports.Photo = Photo;
class SocialMedia {
}
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SocialMedia.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SocialMedia.prototype, "platform", void 0);
exports.SocialMedia = SocialMedia;
class Address {
}
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
exports.Address = Address;
class AdditionalInfos {
}
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdditionalInfos.prototype, "info", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdditionalInfos.prototype, "desc", void 0);
exports.AdditionalInfos = AdditionalInfos;
let Coordinates = class Coordinates extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], Coordinates.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Coordinates.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Geoposition)
], Coordinates.prototype, "gps", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Coordinates.prototype, "photos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Coordinates.prototype, "socials", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", User_1.User)
], Coordinates.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Address)
], Coordinates.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Coordinates.prototype, "infos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Coordinates.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Coordinates.prototype, "updatedAt", void 0);
Coordinates = __decorate([
    (0, typeorm_1.Entity)()
], Coordinates);
exports.Coordinates = Coordinates;
//# sourceMappingURL=Coordinates.js.map