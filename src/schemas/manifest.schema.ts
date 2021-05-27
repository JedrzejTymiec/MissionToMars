import * as mongoose from "mongoose"

export const ManifestSchema = new mongoose.Schema({
    name: String,
    landing_date: String,
    launch_date: String,
    status: String,
    max_sol: Number,
    max_date: String,
    total_photos: Number,
    photos: [
        {
            sol: {
                type: Number,
                unique: false
            },
            earth_date: String,
            total_photos: Number,
            cameras: [String]
        }
    ],
})