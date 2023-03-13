import {
    Label,
    makeStyles,
    shorthands,
} from "@fluentui/react-components";
import { Card } from '@fluentui/react-components/unstable';
import React, { useState } from 'react';
import { ArchivedList } from "./ArchivedList";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        rowGap: "5px",
    },
    card: {
        ...shorthands.margin("auto"),
        maxWidth: "100%",
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

/* ------------------------------ ArchivedMain ------------------------------ */
export const ArchivedMain = (props: any) => {
    const styles = useStyles();
    const [archivedTodos, setArchivedTodos] = useState<Todo[]>(
        JSON.parse(localStorage.getItem("todoArchive") || "[]")
    );
    const [todos, setTodos] = useState<Todo[]>(
        JSON.parse(localStorage.getItem("todoData") || "[]")
    );

    /* ------------------------------ Functions ------------------------------ */
    const deleteTodo = (id: number) => {
        const newTodos = [...archivedTodos].filter((todo) => todo.id !== id);
        setArchivedTodos(newTodos);
        localStorage.setItem("todoArchive", JSON.stringify(newTodos));
    };
    const toggleComplete = (id: number) => {
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

    return (
        <div className={styles.root}>
            <Card className={styles.card} appearance="filled-alternative">
                <h2>Archived Tasks</h2>
                <ArchivedList todos={archivedTodos} deleteTodo={deleteTodo} toggleComplete={toggleComplete}/>

                <Label>There are {archivedTodos.length} archived tasks.</Label>
                
            </Card>
        </div>
    );
};