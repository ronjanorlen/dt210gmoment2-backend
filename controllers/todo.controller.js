"use strict";

const Todo = require("../models/todo.model"); // Inkludera todo-modell 

// Metod för att hämta alla todos 
exports.getAllTodos = async (request, h) => {
    try {
        const todos = await Todo.find();
        // Om inga todos finns returnera meddelande och en tom array
        if (todos.length === 0) { 
            return h.response({
                message: "Hittade inga todos", 
                todos: [] 
            }).code(200);
        }
        // annars returnera alla todos 
        return h.response(todos).code(200);
        // Fånga upp fel 
    } catch (error) {
        console.log("Något gick fel: ", error);
        return h.response("Något gick fel vid hämtning av todos").code(500);
    }
}

// Metod för att hämta enskild todo 
exports.getSingleTodo = async (request, h) => {
    try {
        //Hämta todo baserat på ID 
        const todo = await Todo.findById(request.params.id);
        // Om todo inte finns 
        if (!todo) {
            return h.response({ error: `Todo med ID ${request.params.id} kunde inte hittas` }).code(404);
        }
        // Annars returnera todo 
        return h.response(todo).code(200);
        // Fånga upp fel 
    } catch (error) {   
        console.log("Något gick fel: ", error);
        return h.response("Något gick fel vid hämtning av todo").code(500);
    }
}

// Metod för att lägga till ny Todo 
exports.createTodo = async (request, h) => {
    try {
        const todo = new Todo(request.payload); // Skapa ny todo med data från payload 
        const savedTodo = await todo.save(); // Spara ny todo 
        // Returnera meddelande vid lyckat skapande 
        return h.response({
            message: "Ny Todo skapad",
            todo: savedTodo
        }).code(201);
        // Fånga upp validerings-fel 
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = {};
            // Loopa igenom fel 
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            // Retuerna felmeddelanden 
            return h.response({
                message: "Något gick fel vid skapande av ny todo",
                error: errors
            }).code(400);
        }

        // Ev andra fel 
        console.log("Något gick fel vid skapande av ny todo: ", error);
        return h.response("Något gick fel vid skapande av ny todo").code(500);
    }
}

// Metod för att uppdatera befintlig todo 
exports.updateTodo = async (request, h) => {
    try {
        const todo = await Todo.findById(request.params.id); // Hitta todo att uppdatera
        // Om todo inte hittas 
        if (!todo) {
            return h.response({ error: `Todo med ID ${request.params.id} kunde inte hittas `}).code(404);
        }
        // Annars uppdatera todo med payload 
        const updatedTodo = await Todo.findByIdAndUpdate(
            request.params.id,
            request.payload,
            { new: true, runValidators: true } // Validering 
        );
        // returnera uppdaterad todo 
        return h.response({
            message: "Todon har uppdaterats",
            todo: updatedTodo
        }).code(200);
        // Fånga upp validerings-fel 
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = {};
            // Loopa igenom fel 
            Object.keys(error.erros).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            // Returnera meddelande 
            return h.response({
                message: "Något gick fel vid uppdatering av Todo",
                errors: error
            }).code(400);
        }
        // Fånga upp andra fel 
        console.log("Något gick fel vid uppdatering av Todo: ", error);
        return h.response("Något gick fel vid uppdatering av Todo").code(500);
    }
}

// Metod för att ta bort Todo 
exports.deleteTodo = async (request, h) => {
    try {
        const todo = await Todo.findById(request.params.id); // Hitta todo att ta bort
        // Om todo inte finns 
        if (!todo) {
            return h.response({ error: `Todo med ID ${request.params.id} kunde inte hittas `}).code(404);
        }
        // Annars ta bort todo baserat på ID 
        await Todo.findByIdAndDelete(request.params.id);
        return h.response({
            message: "Todo har tagits bort",
            id: request.params.id
        }).code(200);
        // Fånga upp fel 
    } catch (error) {
        console.log("Något gick fel vid borttagning av Todo: ", error);
        return h.response("Något gick fel vid borttagning av Todo").code(500);
    }
}