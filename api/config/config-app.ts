const { NODE_ENV } = process.env;
import express, { Express } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import { corsOption } from "./cors-option";
import { limiter } from "./rate-limit";
// import xss from "xss";
// import passport from "passport";
// import session from "express-session";
// import MongoStore from "connect-mongo";
// import mongoSanitize from "express-mongo-sanitize";

export const ConfigApp = (app: Express) => {
  // const store = new MongoStore({});
  app.use(express.json({ limit: "10kb" }));
  // app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());
  app.use(bodyParser.text());
  app.set("trust proxy", 1);
  app.use(cookieParser());
  app.use(compression());
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(corsOption());
  app.use(limiter);
  // app.use(passport.initialize());
  // app.use(passport.session());
  // app.use(
  //   session({
  //     resave: false,
  //     saveUninitialized: false,
  //     secret: SESSION_KEY,
  //     store: MongoStore.create({
  // dbName: "newave",
  //       serializer: JSON.stringify,
  // deserializer: JSON.parse,
  // }),
  //   })
  // );
  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   res.removeHeader("x-powered-by");
  //   next();
  // });
  if (NODE_ENV === "development") app.use(morgan("dev"));
  // app.use(express.json({ limit: "10kb" })); // limit request body size to 10kb
};
