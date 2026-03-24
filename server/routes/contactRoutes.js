"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controllers/contactController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/", contactController_1.postContact);
router.get("/", authMiddleware_1.protect, contactController_1.getContacts);
router.delete("/:id", authMiddleware_1.protect, contactController_1.deleteContact);
exports.default = router;
