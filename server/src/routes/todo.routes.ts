import { Router } from "express";
import { getTodos, getTodoById, createTodo, updateToDo, deleteToDo } from "../controllers/todo.controller";

const router: Router = Router();

router.route("/").get(function (req, res) { res.status(200).json({ "status": "OK" }); });
router.route("/todo").get(getTodos);
router.route("/todo/:id").get(getTodoById);
router.route("/todo").post(createTodo)
router.route("/todo").put(updateToDo)
router.route("/todo").delete(deleteToDo)

export default router;