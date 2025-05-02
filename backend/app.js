import express from "express";
import { config } from "dotenv";
config({ path: "./config.env" });
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";


const app = express();
const router = express.Router();

config({ path: "./config.env" });

app.use(cors({
    origin: ['https://friendly-taiyaki-e78cde.netlify.app', 'http://localhost:5173'],
    methods: ["POST"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/send/mail", async (req, res, next) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please provide all details",
        });
    }

    try {
        await sendEmail({
            email: "shubhichandra25@gmail.com",
            subject: "ROYAL FITNESS GYM WEBSITE CONTACT",
            message,
            userEmail: email,
        });

        res.status(200).json({
            success: true,
            message: "Message sent successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});
