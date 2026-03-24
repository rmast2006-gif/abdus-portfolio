import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    type: "text" | "image";
    value: string;
    page: string;
    section: string;
    key: string;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    type: "text" | "image";
    value: string;
    page: string;
    section: string;
    key: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    type: "text" | "image";
    value: string;
    page: string;
    section: string;
    key: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    type: "text" | "image";
    value: string;
    page: string;
    section: string;
    key: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    type: "text" | "image";
    value: string;
    page: string;
    section: string;
    key: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    type: "text" | "image";
    value: string;
    page: string;
    section: string;
    key: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    type: "text" | "image";
    value: string;
    page: string;
    section: string;
    key: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    type: "text" | "image";
    value: string;
    page: string;
    section: string;
    key: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
