import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const date = new Date();
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
};

const formattedDate = date.toLocaleString("en-US", options);

const PostSchema = new Schema({
    _id: String,
    text: { type: String },
    title: { type: String },
    uId: String,
    date: { type: String, default: formattedDate }
})


export default mongoose.model('post', PostSchema);