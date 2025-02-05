"use strict";

const todoController = require("../controllers/todo.controller"); // Inkludera controller för todo 

// Routes, exporteras 
module.exports = (server) => {
    server.route([
        {
            // Hämta alla todos
            method: "GET",
            path: "/todos",
            handler: todoController.getAllTodos
        },
        {
            // Hämta enskild todo
            method: "GET",
            path: "/todo/{id}",
            handler: todoController.getSingleTodo
        },
        {
            // Lägg till todo
            method: "POST",
            path: "/todo",
            handler: todoController.createTodo
        },
        {
            // Uppdatera todo
            method: "PUT",
            path: "/todo/{id}",
            handler: todoController.updateTodo
        },
        {
            // Ta bort todo 
            method: "DELETE",
            path: "/todo/{id}",
            handler: todoController.deleteTodo
        }]
    );
}