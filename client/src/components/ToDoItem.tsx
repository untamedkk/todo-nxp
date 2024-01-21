import React, { } from "react";
import { Card, Checkbox } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

type Props = TodoProps & {
  updateTodo: (updateTodo: ToDoUpdateProps) => void;
  deleteTodo: (id: string) => void;
};

const ToDoItem: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {

  const prop: ToDoUpdateProps = { id: todo.id, status: todo.status }
  const done = todo.status !== 0;

  return (
    <div className="card" style={{ marginBottom: 10 }}>
      <Card
        size="small"
        title=""
        bordered={false}
        actions={[
          <DeleteOutlined key="setting" onClick={() => deleteTodo(todo.id)} />,
          <Checkbox checked={done} disabled={done} onChange={() => updateTodo(prop)} />
        ]}
      >
        <p className={done ? "todo-text" : ""}>{todo.description}</p>
      </Card>
    </div>
  );
};

export default ToDoItem;
