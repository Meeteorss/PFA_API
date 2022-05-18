"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUser = void 0;
const formatUser = (user) => {
    const userEntries = Object.entries(user).filter((ent) => {
        return ent[0] != "password";
    });
    const formattedUser = Object.fromEntries(userEntries);
    return formattedUser;
};
exports.formatUser = formatUser;
//# sourceMappingURL=formatUser.js.map