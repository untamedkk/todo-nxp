import Header from "./components/Header";
import CreateNote from "./components/CreateNote";
import ToDoItem from "./components/ToDoItem";
import { FC, useState, useEffect } from "react";
import { getTodos, createToDo, deleteToDo, updateToDo } from "./API";

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: todos }: Todo[] | any) => {
        setTodos(todos);
      })
      .catch((err: Error) => console.log(err));
  };

  const handleCreateToDo = (description: string): void => {
    createToDo(description)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos([data, ...todos]);
      })
      .catch((err) => console.log(err));
  };

  const deleteATodo = (id: string): void => {
    deleteToDo(id)
      .then(({ status }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not saved");
        }

        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const updateTodoItem = (prop: ToDoUpdateProps): void => {
    updateToDo(prop.id)
      .then(({ status }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not saved");
        }

        fetchTodos();
      })
      .catch((err) => console.log(err));
  };


  return (
    <div>
      <div className="app">
        <Header title="📝TO DO LIST" />
      </div>
      <CreateNote onClick={handleCreateToDo} />
      <div className="to-do-list-container">
        {todos.map((todo: Todo) => (
          <ToDoItem
            key={todo.id}
            updateTodo={(prop) => updateTodoItem(prop)}
            deleteTodo={(id) => deleteATodo(id)}
            todo={todo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
