"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.getContacts = exports.postContact = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Contact_1 = __importDefault(require("../models/Contact"));
const postContact = async (req, res) => {
    if (mongoose_1.default.connection.readyState !== 1) {
        return res.status(503).json({ message: "Database not connected. Cannot send message." });
    }
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const contact = await Contact_1.default.create({ name, email, message });
        res.status(201).json(contact);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.postContact = postContact;
const getContacts = async (req, res) => {
    if (mongoose_1.default.connection.readyState !== 1) {
        return res.status(503).json({ message: "Database not connected. Cannot fetch messages." });
    }
    try {
        const contacts = await Contact_1.default.find().sort({ createdAt: -1 });
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getContacts = getContacts;
const deleteContact = async (req, res) => {
    if (mongoose_1.default.connection.readyState !== 1) {
        return res.status(503).json({ message: "Database not connected. Cannot delete message." });
    }
    try {
        const contact = await Contact_1.default.findByIdAndDelete(req.params.id);
        if (!contact)
            return res.status(404).json({ message: "Message not found" });
        res.json({ message: "Message removed" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.deleteContact = deleteContact;
