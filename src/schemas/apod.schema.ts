import * as mongoose from "mongoose"

export const ApodSchema = new mongoose.Schema({
    copyright: String,
    date: String,
    explanation: String,
    hdurl: String,
    media_type: String,
    service_version: String,
    title: String,
    url: String,
})