"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const data_source_1 = require("./config/data-source");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const redis_1 = __importDefault(require("./config/redis"));
const sharing_1 = require("./routes/sharing");
const constants_1 = require("./constants");
data_source_1.AppDataSource.initialize()
    .then(async () => {
    const app = (0, express_1.default)();
    app.set("trust proxy", 1);
    app.use((0, cors_1.default)({
        origin: [
            "http://localhost:3000",
            "http://192.168.100.47:19000",
            "http://localhost:19002",
        ],
        credentials: true,
    }));
    app.use(body_parser_1.default.json());
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    app.use((0, express_session_1.default)({
        store: new RedisStore({
            client: redis_1.default,
            disableTouch: true,
        }),
        name: "sessionID",
        saveUninitialized: false,
        secret: constants_1.SECRET,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: constants_1.___prod___ ? true : false,
            sameSite: "lax",
            domain: constants_1.___prod___ ? ".test.pfa" : undefined,
        },
    }));
    app.use("/users", routes_1.userRouter);
    app.use("/auth", routes_1.authRouter);
    app.use("/coordinates", routes_1.coordinatesRouter);
    app.use("/sharedcoordinates", routes_1.sharedCoordinatesRouter);
    app.use("/upload", routes_1.uploadRouter);
    app.use("/sharing", sharing_1.sharingRouter);
    app.use("/contacts", routes_1.ContactRouter);
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`server started on localhost:${PORT}`);
    });
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map