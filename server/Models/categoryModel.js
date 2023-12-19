import mongoose, { mongo } from 'mongoose';

const categorySchema  = new mongoose.Schema({
    name:{
        type: String,
        // required:  true,
        // unique: true
    },
    slug: {
        type: String,
        lowercase: true
    }
})

/** export the category model */
export default mongoose.model("Category", categorySchema);