import {
    makeStyles,
    shorthands,
    TabList,
    TabValue,
    SelectTabEvent,
    SelectTabData,
    Tab,
} from "@fluentui/react-components";
import { Card } from '@fluentui/react-components/unstable';

import { AddTodo } from "./TodoAdd";
import { TodoFooter } from "./TodoFooter";
import { TodoList } from './TodoList';
import React, { useState } from 'react';


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
    newTask: {
        display: "flex",
        columnGap: "10px",
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
  
export const TodoMain = (props: any) => {
    const defaultJSON: Todo[] = [];
  
    const localData = localStorage.getItem("todoData");
    if (localData === null) {
        localStorage.setItem("todoData", JSON.stringify(defaultJSON));
    }

    const [todos, setTodos] = useState<Todo[]>(
        JSON.parse(localStorage.getItem("todoData") || "[]")
    );

    const [archivedTodos, setArchivedTodos] = useState<Todo[]>(
        JSON.parse(localStorage.getItem("todoArchive") || "[]")
    );

    // console.log("TodoMain");
    // console.log(localStorage.getItem("todoData"));
  
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
    const styles = useStyles();

    const activeTodos = todos.filter((todo) => !todo.completed);
    const completedTodos = todos.filter((todo) => todo.completed);
    const allTodos = [...activeTodos, ...completedTodos];

    console.log("archivedTodos");
    console.log(archivedTodos);
    console.log("allTodos");
    console.log(allTodos);

    const currentTab = (tab: TabValue) => {
        switch (tab) {
            case "all":
                return allTodos;
            case "active":
                return activeTodos;
            case "completed":
                return completedTodos;
            default:
                return todos;
        }
    };
    
    const [selectedValue, setSelectedValue] = React.useState<TabValue>(
        "all"
    );
    
    const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
        setSelectedValue(data.value);
    };
  
    return (
        <div className={styles.root}>
            <Card className={styles.card} appearance="filled-alternative">
                <h2>Task List</h2>
                <AddTodo addTodo={addTodo} />

                <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
                    <Tab value="all" aria-label="All">
                        All ({allTodos.length})
                    </Tab>
                    <Tab value="active" aria-label="Active">
                        Active ({activeTodos.length})
                    </Tab>
                    <Tab value="completed" aria-label="Completed">
                        Completed ({completedTodos.length})
                    </Tab>
                </TabList>

                <TodoList 
                    todos={currentTab(selectedValue)} 
                    deleteTodo={deleteTodo} 
                    toggleComplete={toggleComplete} 
                    visible={selectedValue === "all" || selectedValue === "active" || selectedValue === "completed"}
                />

                <TodoFooter
                    todos={todos}
                    clearCompleted={() => {
                        // remove all completed todos
                        const newTodos = todos.filter((todo) => !todo.completed);
                        setTodos(newTodos);
                        localStorage.setItem("todoData", JSON.stringify(newTodos));
                        console.log("removeAll");
                    }}
                    archiveCompleted={() => {
                        // add dateArchived property to completed todos
                        const newTodos = todos.map((todo) => { // Adds a dateArchived property to each todo
                            if (todo.completed) {
                                todo.dateArchived = new Date(); // Set the dateArchived property to the current date
                            }
                            return todo;
                        }).filter((todo) => !todo.completed);

                        setTodos(newTodos); // Update the state
                        localStorage.setItem("todoData", JSON.stringify(newTodos)); // Store the new array in localStorage
                        console.log("removeAll");

                        // move all completed todos to another list
                        const existingArchivedTodos = JSON.parse(localStorage.getItem("todoArchive") || "[]"); // Get the existing data
                        const newArchivedTodos = existingArchivedTodos.concat(completedTodos); // Combine the existing and completed todos into a new array
                        setArchivedTodos(completedTodos); // Update the state
                        localStorage.setItem("todoArchive", JSON.stringify(newArchivedTodos)); // Store the new array in localStorage
                        console.log("archiveAll");
                    }}

                />
            </Card>
        </div>
    );
};