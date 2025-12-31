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
import cors from "cors";


const pass: string = JWT_Password

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Add middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
        body: req.body,
        contentType: req.headers['content-type'],
        contentLength: req.headers['content-length']
    });
    next();
});

const userSchema = z.object({
    username: z.string()
        .min(3, {message: "Username must be at least 3 characters long"})
        .regex(/^[a-zA-Z0-9_]+$/, {message: "Username can only contain letters, numbers, and underscores"}),
    password: z.string()
        .min(6, {message: "Password must be at least 6 characters long"})
        .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"}),
});

type FinalUserSchema = z.infer<typeof userSchema>

app.post("/api/v1/signup", async (req: Request, res: Response) => {
    console.log('Signup request received:', {
        body: req.body,
        headers: req.headers['content-type'],
        contentLength: req.headers['content-length']
    });
    
    const validation = userSchema.safeParse(req.body);
    
    try{
        if(!validation.success){
            console.log('Validation failed:', validation.error.errors);
            const errors = validation.error.errors.map(err => ({
                field: err.path[0],
                message: err.message
            }));
            
            res.status(400).json({
                message: "Validation failed",
                errors: errors
            });
            return;
        }

        const updateBody: FinalUserSchema = validation.data;
        const saltRounds = 10;

        console.log('Creating user with username:', updateBody.username);
        const hashedPassword = await bcrypt.hash(updateBody.password, saltRounds);

        await UserModel.create({
            username: updateBody.username,
            password: hashedPassword,
        });

        console.log('User created successfully');
        res.status(200).json({
            message: "User Signed Up !!"
        });

    }catch(error){
        console.log('Signup error:', error);
        res.status(409).json({
            message : `User already exists`
        })
    }
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {

    const updateBody: FinalUserSchema = req.body;

    try{


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
    const type = req.body.type;

    await ContentModel.create({
        link,
        title,
        type,
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

    try{
        await ContentModel.deleteOne({
            _id: contentId,
            userId: req.userId
        });

        res.json({
            message: "Deleted"
        })
    }catch(error){
        res.status(500).json({
            message: "server error while deleting content"
        })
    }

});

app.post("/api/v1/brain/share", userMiddleWare,async (req: Request,res: Response) => {
    try{

    const share = req.body.share;

    if(share){

        const existingLink = await LinkModel.findOne({
            userId: req.userId,
        });

        if(existingLink){
            res.json({
                hash: existingLink.hash,
            })
            return;
        }

        const hash = random(10)
        await LinkModel.create({
            userId: req.userId,
            hash: hash,
        });

        res.json({
            message: "/share/"+hash,
        });

    }else{
        await LinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Remove Link"
        });
    }

    }catch (error){
        console.log("error Occurred at Share end Point: ", error);
    }
});

app.get("/api/v1/brain/:shareLink",async (req: Request, res: Response)=> {

    try{

        const hash: string = String(req.params.shareLink);

        const link = await LinkModel.findOne({
            hash
        })

        if(!link){
            res.status(411).json({
                message: "Sorry Incorrect Input!!"
            });

            return;
        }

        const content = await ContentModel.find({
            userId: link.userId,
        });

        const user = await UserModel.findOne({
                _id: link.userId
        });

        if(!user){
            res.status(411).json({
                message: "user not found, error should ideally not happened!!"
            });

            return;
        }

        res.json({
            username: user.username,
            content: content
        });

    }catch(error){
        console.log("Error Occurred while getting the link: ", error);
    }
});

async function main() {

    const Connection: string = String(process.env.MONGODB_Connection);

    await mongoose.connect(Connection);

    app.listen(4000, () => {
        console.log(`Server is running on port 4000`);
    });
}

main();
