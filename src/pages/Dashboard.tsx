import { TodoMain } from "../components/TaskList/TodoListMain"
import React, { useState } from 'react';


interface Todo {
    id: number;
    name: string;
    completed: boolean;
    dateCreated: Date;
    dateCompleted?: Date; // optional
    dateArchived?: Date; // optional
}

export const Dashboard = React.memo(() => {
    const [todos, setTodos] = useState<Todo[]>(
        JSON.parse(localStorage.getItem("todoData") || "[]")
    );
    return (
        <div role="tabpanel" aria-labelledby="Dashboard">
            <TodoMain todos={todos} setTodos={setTodos} />
        </div>
    );
});