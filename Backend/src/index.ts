import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {z} from "zod";
import { UserModel, ContentModel, LinkModel } from "./db";
import bcrypt from "bcrypt";
import { JWT_Password } from "./config";
import { userMiddleWare } from "./middleware";
import { ObjectType } from "typescript";
import { random } from "./utils";


const pass: string = JWT_Password

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

    try{

        if(!success){
            res.status(411).json({
                message: "something wrong in SignUp Route!!",
            })

            return;
        }

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
            message : `Error Occurred in SignUp EndPoint : ${error}`
        })
    }

});

app.post("/api/v1/signin", async (req: Request, res: Response) => {

    const {success} = userSchema.safeParse(req.body);
    const updateBody: FinalUserSchema = req.body;

    try{

        if(!success){
            res.status(411).json({
                message: "something wrong in SignIn Route!!",
            })

            return;
        }

    const username = updateBody.username;

    const existingUser = await UserModel.findOne({
        username
    })as {_id: ObjectType, username: string, password: string};

    if (existingUser){

        const isPassWordCorrect = await bcrypt.compare(updateBody.password, existingUser.password);

        if(isPassWordCorrect){
            const token = jwt.sign({
                id: existingUser._id
            }, pass);
            res.json({
                token: token
            });
        }else{
            res.status(403).json({
                message: "Incorrect Credentials !!"
            })
        }

    }else{
        res.status(403).json({
            message: "Incorrect Credentials !!"
        })
    }

    }catch(error){
        res.status(409).json({
            message: `Error Occurred in SignIn EndPoint: ${error}`
        })
    }

});

app.post("/api/v1/content",userMiddleWare,async (req: Request, res: Response) => {

    const link = req.body.link;
    const title = req.body.title;

    await ContentModel.create({
        link,
        title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    });

});

app.get("/api/v1/content",userMiddleWare,async (req: Request, res: Response) => {

    const userId = req.userId;

    try {
        const content = await ContentModel.find({
            userId: userId
        }).populate("userId", "username");

        res.json({
            content: content
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching content",
        });
    }

});

app.delete("/api/v1/content",userMiddleWare,async (req: Request, res: Response) => {

    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })

});

app.post("/api/v1/brain/share", userMiddleWare,(req: Request,res: Response) => {
    const share = req.body.share;

    if(share){
        LinkModel.create({
            userId: req.userId,
            hash: random(10)
        })
    }else{
        LinkModel.deleteOne({
            userId: req.userId
        });
    }

    res.json({
        message: "Updated Sharable Link!!"
    })
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
