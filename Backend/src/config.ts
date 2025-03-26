import dotenv from "dotenv";

dotenv.config()

export const JWT_Password: string  =  String(process.env.JWT_Password);