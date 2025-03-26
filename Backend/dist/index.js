"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const userSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: "Name cannot be empty" }),
    password: zod_1.z.string().min(4, { message: "password should be at least 4 letter" }).max(6, { message: "password is not greater than 6 letters." }),
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = userSchema.safeParse(req.body);
    const updateBody = req.body;
    if (!success) {
        res.status(411).json({
            message: "something wrong in SignUp Route!!",
        });
        return;
    }
    try {
        const Name = updateBody.username;
        const existingUser = yield db_1.UserModel.findOne({ Name });
        if (existingUser) {
            res.status(409).json({
                message: "User already exist !!"
            });
            return;
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(updateBody.password, saltRounds);
        yield db_1.UserModel.create({
            username: updateBody.username,
            password: hashedPassword,
        });
        res.status(200).json({
            message: "User Signed Up !!"
        });
    }
    catch (error) {
        res.status(409).json({
            message: `Error Occurred: ${error}`
        });
    }
}));
app.post("/api/v1/signin", (req, res) => {
});
app.post("/api/v1/content", (req, res) => {
});
app.get("/api/v1/content", (req, res) => {
});
app.delete("/api/v1/content", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const Connection = String(process.env.MONGODB_Connection);
        yield mongoose_1.default.connect(Connection);
        app.listen(4000, () => {
            console.log(`Server is running on port 4000`);
        });
    });
}
main();
