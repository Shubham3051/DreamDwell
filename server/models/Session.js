import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

export default mongoose.model("session", sessionSchema);