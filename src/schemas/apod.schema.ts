import * as mongoose from "mongoose"

export const ApodSchema = new mongoose.Schema({
    copyright: String,
    date: {
        type: String,
        unique: true
    },
    explanation: String,
    media_type: String,
    title: String,
    url: String,
})