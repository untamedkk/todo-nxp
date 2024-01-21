import { Request, Response } from "express";
const pool = require("../routes/config/connection");
import { v4 as uuidv4 } from "uuid";

interface Todo {
    id: string;
    description: string;
    status: number;
    date: string;
}

export const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos = await pool.query("SELECT * FROM todos ORDER BY status, date DESC");
        res.status(200).json(todos.rows);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getTodoById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const id = req.params.id;
    try {
        const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);

        if (result.rowCount > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ "status": "id not found in the database" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createTodo = async (
    req: Request,
    res: Response
): Promise<void> => {
    var todo = <Todo>{};

    const body = req.body;

    if (!body.description || body.description === undefined) {
        res.status(400).send({ "status": "description must not be null." });
        return;
    }

    todo.id = uuidv4();
    todo.date = new Date().toUTCString();
    todo.description = body.description;
    todo.status = 0;

    try {
        const query = {
            text: "INSERT INTO todos (id, description, status, date) VALUES($1, $2, $3, $4)",
            values: [todo.id, todo.description, todo.status, todo.date],
        };

        const result = await pool.query(query);

        if (result.rowCount > 0) {
            res.status(201).json(todo);
        } else {
            res.status(400).json({ "status": "Bad Request" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateToDo = async (
    req: Request,
    res: Response
): Promise<void> => {

    const body = req.body;

    if (!body.id || body.id === undefined) {
        res.status(400).send({ "status": "id must not be null." });
        return;
    }

    if (!body.status || body.status === undefined) {
        res.status(400).send({ "status": "status must not be null." });
        return;
    }

    try {
        const query = {
            text: "UPDATE todos SET status = $1 WHERE id = $2 RETURNING *",
            values: [body.status, body.id],
        };

        const result = await pool.query(query);

        if (result.rowCount > 0) {
            res.status(200).json({ "status": "OK" });
        } else {
            res.status(400).json({ "status": "Bad Request" });
        }
    } catch (err) {
        res.status(400).json({ "status": "Bad Request" });
    }
};

export const deleteToDo = async (
    req: Request,
    res: Response
): Promise<void> => {

    const body = req.body;

    if (!body.id || body.id === undefined) {
        res.status(400).send({ "status": "id must not be null." });
        return;
    }

    try {
        const query = {
            text: "DELETE FROM todos WHERE id = $1",
            values: [body.id],
        };

        const result = await pool.query(query);

        if (result.rowCount > 0) {
            res.status(200).json({ "status": "OK" });
        } else {
            res.status(400).json({ "status": "Bad Request" });
        }
    } catch (err) {
        res.status(400).json({ "status": "Bad Request" });
    }
};