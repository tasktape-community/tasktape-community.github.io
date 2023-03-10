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
import { AddTodo } from './TodoAdd';
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

    console.log("TodoMain");
    console.log(localStorage.getItem("todoData"));
  
    const addTodo = (todoName: string) => {
        if (todoName !== "") {
            const newId = todos.length + 1;
            const newTodos = [...todos, { id: newId, name: todoName, completed: false }];
            setTodos(newTodos);
            localStorage.setItem("todoData", JSON.stringify(newTodos));
            console.log("addTodo");
            console.log(localStorage.getItem("todoData"));
        }
    };
  
    const deleteTodo = (id: number) => {
        const newTasks = todos.filter((todo) => todo.id !== id);
        setTodos(newTasks);
        localStorage.setItem("todoData", JSON.stringify(newTasks));
        console.log("deleteTodo");
        console.log(localStorage.getItem("todoData"));
    };

    const toggleComplete = (id: number) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(newTodos);
        localStorage.setItem("todoData", JSON.stringify(newTodos));
        console.log("toggleComplete");
        console.log(localStorage.getItem("todoData"));
    };

    const currentTab = (tab: TabValue) => {
        switch (tab) {
            case "all":
                return todos;
            case "active":
                return todos.filter((todo) => !todo.completed);
            case "completed":
                return todos.filter((todo) => todo.completed);
            default:
                return todos;
        }
    };
      
  
    const styles = useStyles();

    const allTodos = todos;
    const activeTodos = todos.filter((todo) => !todo.completed);
    const completedTodos = todos.filter((todo) => todo.completed);

    
    const [selectedValue, setSelectedValue] = React.useState<TabValue>(
        "all"
    );
    
    const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
        setSelectedValue(data.value);
    };
  
    return (
        <div className={styles.root}>
            <Card className={styles.card} appearance="filled-alternative">
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

                {selectedValue === "all" && <TodoList todos={currentTab(selectedValue)} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />}
                {selectedValue === "active" && <TodoList todos={currentTab(selectedValue)} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />}
                {selectedValue === "completed" && <TodoList todos={currentTab(selectedValue)} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />}
                
            </Card>
        </div>
    );
};