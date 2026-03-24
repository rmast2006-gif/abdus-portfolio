"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const AdminUser_1 = __importDefault(require("../models/AdminUser"));
const db_1 = require("../config/db");
dotenv_1.default.config();
const ADMIN_EMAIL = "abdu.ssamietahir2006@gmail.com";
const ADMIN_PASSWORD = "qwerty999";
const createAdmin = async () => {
    try {
        await (0, db_1.connectDB)();
        const hashedPassword = await bcryptjs_1.default.hash(ADMIN_PASSWORD, 10);
        const existingAdmin = await AdminUser_1.default.findOne({ email: ADMIN_EMAIL });
        if (existingAdmin) {
            existingAdmin.password = hashedPassword;
            await existingAdmin.save();
            console.log("Admin password updated");
        }
        else {
            await AdminUser_1.default.create({
                email: ADMIN_EMAIL,
                password: hashedPassword,
            });
            console.log("Admin created");
        }
        process.exit(0);
    }
    catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};
createAdmin();
