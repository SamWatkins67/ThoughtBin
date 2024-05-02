import mongoose from 'mongoose';

const thoughtSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            minlength: [1, 'First name must be at least 1 character'],
            maxlength: [255, 'First name cannot exceed 255 characters'],
        },
        thoughtTitle: {
            type: String,
            required: [true, 'Thought title is required'],
            minlength: [3, 'Thought title must be at least 3 characters long'],
            maxlength: [255, 'Thought title cannot exceed 255 characters'],
        },
        thought: {
            type: String,
            required: [true, 'Thought is required'],
            minlength: [1, 'Thought must be at least 1 character long'],
            maxlength: [1000, 'Thought cannot exceed 1000 characters'],
        },
        isNegative: {
            type: Boolean,
            default: false,
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

const Thought = mongoose.model('Thought', thoughtSchema);

export default Thought;