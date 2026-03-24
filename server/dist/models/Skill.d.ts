import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    name: string;
    order: number;
    level: number;
    category: "Frontend" | "Backend" | "Database & DevOps" | "Other";
    color: string;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    order: number;
    level: number;
    category: "Frontend" | "Backend" | "Database & DevOps" | "Other";
    color: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    order: number;
    level: number;
    category: "Frontend" | "Backend" | "Database & DevOps" | "Other";
    color: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    order: number;
    level: number;
    category: "Frontend" | "Backend" | "Database & DevOps" | "Other";
    color: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    order: number;
    level: number;
    category: "Frontend" | "Backend" | "Database & DevOps" | "Other";
    color: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    name: string;
    order: number;
    level: number;
    category: "Frontend" | "Backend" | "Database & DevOps" | "Other";
    color: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    order: number;
    level: number;
    category: "Frontend" | "Backend" | "Database & DevOps" | "Other";
    color: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    order: number;
    level: number;
    category: "Frontend" | "Backend" | "Database & DevOps" | "Other";
    color: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
