import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "./config/data-source";
import express from "express";
import bodyParser from "body-parser";
import {
  prodRouter,
  userRouter,
  authRouter,
  coordinatesRouter,
} from "./routes";
import connectRedis from "connect-redis";
import session from "express-session";
import cors from "cors";
import redis from "./config/redis";
// import { User } from "./entities/User";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.set("trust proxy", 1);
    app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "http://192.168.100.47:19000",
          "http://localhost:19002",
        ],
        credentials: true,
      })
    );
    app.use(bodyParser.json());

    const RedisStore = connectRedis(session);

    app.use(
      session({
        store: new RedisStore({
          client: redis,
          disableTouch: true,
        }),
        name: "sessionID",
        saveUninitialized: false,
        secret: process.env.PORT!,
        resave: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          // domain: ___prod___ ? ".test.pfa" : undefined,
        },
      })
    );

    // const users = await User.find({ where: { username: "Meeteorss" } });
    // await User.remove(users);
    app.use("/users", userRouter);
    app.use("/prods", prodRouter);
    app.use("/auth", authRouter);
    app.use("/coordinates", coordinatesRouter);
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`server started on localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
