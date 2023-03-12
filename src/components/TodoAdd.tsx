
import {
    makeStyles,
    useId,
    Input,
    Button,
} from "@fluentui/react-components";
import React, { useState } from 'react';

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        rowGap: "5px",
    },
    newTask: {
        display: "flex",
        columnGap: "10px",
    },
});



export const AddTodo = (props: any) => {
    const [todoName, setTodoName] = useState("");

    const setTodo = (e: any) =>{
        setTodoName(e.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.addTodo(todoName);
        setTodoName("");
    };

    const inputId = useId("input");
    const styles = useStyles();

    return (
    <div className={styles.root}>
        <form onSubmit={handleSubmit}>  
            <div className = {styles.newTask}>
            <Input
                aria-label="inline"
                placeholder="New item"
                id={inputId}
                {...props}
                value={todoName}
                onChange={setTodo}
            />
            <Button aria-label="inline" type="submit">
                Add
            </Button>
            </div>
        </form>
    </div>
    );
};