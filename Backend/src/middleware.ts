import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import { JWT_Password } from "./config";

// Override the types of the express request Object.
declare global {
    namespace Express {
      interface Request {
        userId?: string | number;
      }
    }
  }

const password: string  =  JWT_Password;


export const userMiddleWare = (req: Request, res: Response, next: NextFunction)=> {

    try {
        const token: string = String(req.headers["authorization"]);

        const decode = jwt.verify(token, password) as { id: string | number };

        if (decode) {
          req.userId = decode.id;
          next();
        } else {
          res.status(401).json({ message: "Unauthorized" });
        }
      } catch (error) {
        res.status(401).json({ message: "Invalid token" });
      }
}
