import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    goodreadsId: { type: String },
    title: { type: String, required: true },
    authors: { type: String, required: true },
    cover: { type: String, required: true },
    pages: { type: Number, required: true },
    progress: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }
})

export default mongoose.model("Book", schema);