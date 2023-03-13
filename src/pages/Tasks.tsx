import React, { useState } from 'react';
import { TodoMain } from "../components/TaskList/TodoListMain";
import { ArchivedMain } from "../components/ArchivedTasks/ArchivedMain";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    columnGap: "20px",
  },
});

interface Todo {
  id: number;
  name: string;
  completed: boolean;
  archived: boolean;
  dateCreated: Date;
  dateCompleted?: Date; // optional
  dateArchived?: Date; // optional
}

export const Tasks = React.memo(() => {
  const [todos, setTodos] = useState<Todo[]>(
      JSON.parse(localStorage.getItem("todoData") || "[]")
  );
  console.log("Todos length: "+todos.length);
  
  const defaultJSON: Todo[] = [];
  
  
  
  return (
    <div role="tabpanel" aria-labelledby="Tasks" className={useStyles().root}>
      <TodoMain 
        todos={todos}
        setTodos={setTodos}
        // deleteTodo={deleteTodo}
      />
      <ArchivedMain
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
});
