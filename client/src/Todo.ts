interface Todo {
    id: string;
    description: string;
    status: number;
    date: string;
}

type ApiDataType = {
    message: string
    status: string
    todos: Todo[]
    todo?: Todo
  }

  type ToDoUpdateProps = {
    id: string;
    status: number;
  }

type TodoProps = {
    todo: Todo
}

interface UpdateTodo {
    id: string;
    status: number;
}

