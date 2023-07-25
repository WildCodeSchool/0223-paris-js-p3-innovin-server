const {createNote} = require("./model");

const addNote = async (req, res) => { 
    const note = req.body;
    const {id} = req.params;
    const user_id = req.userId;
    
    try {  await createNote(note, id, user_id) 
        res.status(201).json("note added");

    } catch (error) {
        console.error(error);
        res.status(500).json("Error while adding the note");
    }
};

exports.addNote = addNote;