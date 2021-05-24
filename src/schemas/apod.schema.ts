import * as mongoose from "mongoose"

export const ApodSchema = new mongoose.Schema({
    copyright: String,
    date: {
        type: String,
        unique: true
    },
    explanation: String,
    hdurl: String,
    media_type: String,
    service_version: String,
    title: String,
    url: String,
})