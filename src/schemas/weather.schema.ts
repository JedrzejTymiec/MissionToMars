import * as mongoose from "mongoose"

export const WeatherSchema = new mongoose.Schema({
    terrestrial_date: {
        type: String,
        unique: true
    },
    sol: {
        type: String,
        unique: true
    },
    ls: String,
    season: String,
    min_temp: Number,
    max_temp: Number,
    pressure: Number,
    sunrise: String,
    sunset: String
})