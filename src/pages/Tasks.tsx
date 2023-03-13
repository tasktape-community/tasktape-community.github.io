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
  dateCreated: Date;
  dateCompleted?: Date; // optional
  dateArchived?: Date; // optional
}

export const Tasks = React.memo(() => {
  const [archivedTodos, setArchivedTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todoArchive") || "[]")
  );
  const [todos, setTodos] = useState<Todo[]>(
      JSON.parse(localStorage.getItem("todoData") || "[]")
  );
  console.log("Todos length: "+todos.length);
  console.log("Archived length: "+archivedTodos.length);
  console.log("Possible new id: "+(todos.length + 1));

  /* ------------------------------ Functions ------------------------------ */
  const deleteTodoArchive = (id: number) => {
      const newTodos = [...archivedTodos].filter((todo) => todo.id !== id);
      setArchivedTodos(newTodos);
      localStorage.setItem("todoArchive", JSON.stringify(newTodos));
  };
  const toggleCompleteArchive = (id: number) => {
      // remove the todo from the archive list and add it to the todo list
      const newTodos = [...archivedTodos].filter((todo) => todo.id !== id);
      setArchivedTodos(newTodos);
      localStorage.setItem("todoArchive", JSON.stringify(newTodos));

      const todoToAdd = [...archivedTodos].filter((todo) => todo.id === id);
      const newId = todos.length + 1;
      const newTodoList = [...todos, { id: newId, name: todoToAdd[0].name, completed: false, dateCreated: new Date() }];
      setTodos(newTodoList);
      localStorage.setItem("todoData", JSON.stringify(newTodoList));
  };
  
  const defaultJSON: Todo[] = [];
  
  const localData = localStorage.getItem("todoData");
  if (localData === null) {
      localStorage.setItem("todoData", JSON.stringify(defaultJSON));
  }
  
  const addTodo = (todoName: string) => {
      if (todoName !== "") {
          const newId = todos.length + 1;
          const newTodos = [...todos, { id: newId, name: todoName, completed: false, dateCreated: new Date() }];
          setTodos(newTodos);
          localStorage.setItem("todoData", JSON.stringify(newTodos));
          console.log("addTodo");
          // console.log(localStorage.getItem("todoData"));
      }
  };

  const deleteTodo = (id: number) => {
      const newTasks = todos.filter((todo) => todo.id !== id);
      setTodos(newTasks);
      localStorage.setItem("todoData", JSON.stringify(newTasks));
      console.log("deleteTodo");
      // console.log(localStorage.getItem("todoData"));
  };

  const toggleComplete = (id: number) => {
      const newTodos = todos.map((todo) => {
          if (todo.id === id) {
              todo.completed = !todo.completed;
              if (todo.completed) { // set the dateCompleted to the current date if the task is completed
                  todo.dateCompleted = new Date();
              }
          }
          return todo;
      });
      setTodos(newTodos);
      localStorage.setItem("todoData", JSON.stringify(newTodos));
      console.log("toggleComplete");
      // console.log(localStorage.getItem("todoData"));
  };
  
  return (
    <div role="tabpanel" aria-labelledby="Tasks" className={useStyles().root}>
      <TodoMain todos={todos} archivedTodos={archivedTodos} setArchivedTodos={setArchivedTodos} setTodos={setTodos} addTodo={addTodo} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
      <ArchivedMain archivedTodos={archivedTodos} setArchivedTodos={setArchivedTodos} todos={todos} setTodos={setTodos} deleteTodoArchive={deleteTodoArchive} toggleCompleteArchive={toggleCompleteArchive} />
    </div>
  );
});
