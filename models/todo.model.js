"use strict";

const Mongoose = require("mongoose"); // Inkludera mongoose 

// Schema för todos 
const todoSchema = Mongoose.Schema({
    title: {
        type: String,
        required: [true, "Ange en titel"],
        minlength: [3, "Titel måste vara minst 3 tecken"]
    },
    description: {
        type: String,
        required: [true, "Ange en kort beskrivning"],
        maxlength: [200, "Beskrivning får vara max 200 tecken"]
    },
    status: {
        type: String,
        enum: ["Ej påbörjad", "Pågående", "Avklarad"], // Statusar 
        default: "Ej påbörjad" // default är ej påbörjad 
    },
},
    { timestamps: true } // Skapa timestamps för todos
);

const Todo = Mongoose.model("Todo", todoSchema); // Modell för todos 

module.exports = Todo; // Exportera modell 