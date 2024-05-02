import Thought from '../models/thought.models.js';

async function test(req, res) {
    res.json({ message: 'connected' });
}

//  \\  * CREATE *  //  \\
const createThought = async (req, res) => { 
    try { 
        const newThought = new Thought(req.body);  
        const thought = await newThought.save();  
        res.status(201).json(thought);
    } catch (error) { 
        console.error(error); 
        res.status(400).json({ error: error.message });  
    }
};

//  \\  * GET ALL *  //  \\
const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

//  \\  * GET ONE *  //  \\
async function getOneThought(req, res) {
    try {
        const foundThought = await Thought.findById(req.params.id);
        res.json(foundThought);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

//  \\  * UPDATE *  //  \\
async function updateOneThought(req, res) {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, options);
        res.json(updatedThought);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

//  \\  * DELETE *  //  \\
async function deleteOneThought(req, res) {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        res.json(deletedThought);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export { createThought, getAllThoughts, test, getOneThought, updateOneThought, deleteOneThought };