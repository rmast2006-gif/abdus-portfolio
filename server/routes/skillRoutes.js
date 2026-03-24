"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skillController_1 = require("../controllers/skillController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/", skillController_1.getSkills);
router.post("/", authMiddleware_1.protect, skillController_1.createSkill);
router.put("/:id", authMiddleware_1.protect, skillController_1.updateSkill);
router.delete("/:id", authMiddleware_1.protect, skillController_1.deleteSkill);
exports.default = router;
