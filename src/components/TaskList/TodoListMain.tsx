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
import * as React from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        rowGap: "5px",
    },
    card: {
        ...shorthands.margin("auto"),
        maxWidth: "100%",
        flexGrow: 1,
    },
    content: {
        display: "flex",
        maxWidth: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        rowGap: "10px",
    },
    newTask: {
        display: "flex",
        columnGap: "10px",
    },
    flex: {
        display: "flex",
        rowGap: "10px",
        flexDirection: "column",
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

    const addTodo = (todoName: string) => {
        if (todoName !== "") {
            const newId = props.todos.length + 1;
            const newTodos = [...props.todos, { id: newId, name: todoName, completed: false, dateCreated: new Date(), archived: false }];
            props.setTodos(newTodos);
            localStorage.setItem("todoData", JSON.stringify(newTodos));
            console.log("addTodo");
        }
    };

    const deleteTodo = (id: number) => {
        const newTasks = props.todos.filter((todo: any) => todo.id !== id);
        props.setTodos(newTasks);
        localStorage.setItem("todoData", JSON.stringify(newTasks));
        console.log("deleteTodo");
    };
    
    const toggleComplete = (id: number) => {
        const newTodos = props.todos.map((todo: any) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
                if (todo.archived) { // if the task is archived, unarchive it
                todo.archived = false;
                }
                if (todo.completed) { // set the dateCompleted to the current date if the task is completed
                todo.dateCompleted = new Date();
                }
            }
            return todo;
        });
        props.setTodos(newTodos);
        localStorage.setItem("todoData", JSON.stringify(newTodos));
        console.log("toggleComplete");
    };

    const styles = useStyles();

    const activeTodos = props.todos.filter((todo: any) => !todo.completed && !todo.archived);
    const completedTodos = props.todos.filter((todo: any) => todo.completed && !todo.archived);
    const allTodos = [...activeTodos, ...completedTodos].filter((todo: any) => !todo.archived);

    console.log("archivedTodos");
    console.log(props.todos.filter((todo: any) => todo.archived));
    console.log("Todos");
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
                return props.todos;
        }
    };
    
    const [selectedValue, setSelectedValue] = React.useState<TabValue>(
        "active"
    );
    
    const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
        setSelectedValue(data.value);
    };
  
    return (
        <div className={styles.root}>
            <Card className={styles.card} appearance="filled-alternative">
                <div className={styles.content}>
                    <div className={styles.flex}>
                        <h2>Task List</h2>
                        <AddTodo addTodo={addTodo} />

                        <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
                            <Tab value="active" aria-label="Active">
                                Active ({activeTodos.length})
                            </Tab>
                            <Tab value="completed" aria-label="Completed">
                                Completed ({completedTodos.length})
                            </Tab>
                            <Tab value="all" aria-label="All">
                                All ({allTodos.length})
                            </Tab>
                        </TabList>
                        <TodoList
                            todos={currentTab(selectedValue).filter((todo: any) => !todo.archived)} 
                            deleteTodo={deleteTodo} 
                            toggleComplete={toggleComplete} 
                            visible={selectedValue === "all" || selectedValue === "active" || selectedValue === "completed"}
                        />
                    </div>
                    <div>
                        <TodoFooter
                            todos={props.todos}
                            archiveCompleted={() => {
                                // add dateArchived property to completed todos
                                const newTodos = props.todos.map((todo: any) => { // Adds a dateArchived property to each todo
                                    if (todo.completed) {
                                        todo.dateArchived = new Date(); // Set the dateArchived property to the current date
                                        todo.archived = true;
                                    }
                                    return todo;
                                })
                                props.setTodos(newTodos); // Update the state
                                localStorage.setItem("todoData", JSON.stringify(newTodos)); // Store the new array in localStorage
                                console.log("removeAll + archiveAll");
                            }}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};