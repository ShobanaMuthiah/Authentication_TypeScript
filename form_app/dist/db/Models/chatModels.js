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
exports.Chats = void 0;
const typeorm_1 = require("typeorm");
const userModel_js_1 = require("./userModel.js");
let Chats = class Chats {
};
exports.Chats = Chats;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Chats.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chats.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], Chats.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userModel_js_1.UserEntity, (sentUser) => sentUser.sentMessages),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", userModel_js_1.UserEntity)
], Chats.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receiver_id' }),
    __metadata("design:type", Number)
], Chats.prototype, "receiverId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userModel_js_1.UserEntity, (receivedUser) => receivedUser.receivedMessages),
    (0, typeorm_1.JoinColumn)({ name: 'receiver_id' }),
    __metadata("design:type", userModel_js_1.UserEntity)
], Chats.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Chats.prototype, "createdAt", void 0);
exports.Chats = Chats = __decorate([
    (0, typeorm_1.Entity)('chats')
], Chats);
