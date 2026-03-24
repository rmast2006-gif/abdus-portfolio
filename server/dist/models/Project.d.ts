import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    title: string;
    description: string;
    image: string;
    githubLink: string;
    liveLink: string;
    tags: string[];
    featured: boolean;
    order: number;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    title: string;
    description: string;
    image: string;
    githubLink: string;
    liveLink: string;
    tags: string[];
    featured: boolean;
    order: number;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    title: string;
    description: string;
    image: string;
    githubLink: string;
    liveLink: string;
    tags: string[];
    featured: boolean;
    order: number;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    description: string;
    image: string;
    githubLink: string;
    liveLink: string;
    tags: string[];
    featured: boolean;
    order: number;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    title: string;
    description: string;
    image: string;
    githubLink: string;
    liveLink: string;
    tags: string[];
    featured: boolean;
    order: number;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    title: string;
    description: string;
    image: string;
    githubLink: string;
    liveLink: string;
    tags: string[];
    featured: boolean;
    order: number;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    title: string;
    description: string;
    image: string;
    githubLink: string;
    liveLink: string;
    tags: string[];
    featured: boolean;
    order: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    title: string;
    description: string;
    image: string;
    githubLink: string;
    liveLink: string;
    tags: string[];
    featured: boolean;
    order: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
