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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const AdminUser_1 = __importDefault(require("../models/AdminUser"));
const db_1 = require("../config/db");
dotenv_1.default.config();
const ADMIN_EMAIL = "abdu.ssamietahir2006@gmail.com";
const ADMIN_PASSWORD = "qwerty999";
const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        const hashedPassword = yield bcryptjs_1.default.hash(ADMIN_PASSWORD, 10);
        const existingAdmin = yield AdminUser_1.default.findOne({ email: ADMIN_EMAIL });
        if (existingAdmin) {
            existingAdmin.password = hashedPassword;
            yield existingAdmin.save();
            console.log("Admin password updated");
        }
        else {
            yield AdminUser_1.default.create({
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
});
createAdmin();
