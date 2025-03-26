import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {z} from "zod";
import dotenv from "dotenv";
import { UserModel } from "./db";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();

app.use(express.json());

const userSchema = z.object({
    username: z.string().min(1,{message: "Name cannot be empty"}),
    password: z.string().min(4, {message: "password should be at least 4 letter"}).max(6, {message: "password is not greater than 6 letters."}),
});

type FinalUserSchema = z.infer<typeof userSchema>

app.post("/api/v1/signup", async (req: Request, res: Response) => {
    const {success} = userSchema.safeParse(req.body);
    const updateBody: FinalUserSchema = req.body;

    if(!success){
        res.status(411).json({
            message: "something wrong in SignUp Route!!",
        })
        return;
    }

    try{

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(updateBody.password, saltRounds);

        await UserModel.create({
            username: updateBody.username,
            password: hashedPassword,
        });

        res.status(200).json({
            message: "User Signed Up !!"
        });

    }catch(error){
        res.status(409).json({
            message : `Error Occurred: ${error}`
        })
    }

});

app.post("/api/v1/signin", (req, res) => {

});

app.post("/api/v1/content", (req, res) => {

});

app.get("/api/v1/content", (req, res) => {

});

app.delete("/api/v1/content", (req, res) => {

});

app.post("/api/v1/brain/share", (req,res) => {

});

app.get("/api/v1/brain/:shareLink", (req, res)=> {

});

async function main() {

    const Connection: string = String(process.env.MONGODB_Connection);

    await mongoose.connect(Connection);

    app.listen(4000, () => {
        console.log(`Server is running on port 4000`);
    });
}

main();
