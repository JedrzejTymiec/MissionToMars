import * as mongoose from "mongoose"

export const PhotoSchema = new mongoose.Schema({
    sol: Number,
    camera: String,
    img_src: {
        type: String,
        unique: true
    },
    earth_date: String,
    rover: String,
})