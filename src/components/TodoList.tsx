
import {
    makeStyles,
    shorthands,
    Label,
} from "@fluentui/react-components";
import { TodoItem } from "./TodoItem";

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



export const TodoList = (props: any) => {
    const styles = useStyles();

    return (
    <div className={styles.root}>
        { props.todos.length > 0 ? props.todos.map((todo: any) => (
            <TodoItem todo={todo} key={todo.id} deleteTodo={props.deleteTodo} />
        )): 
        <Label>Todo list is empty...</Label>}
    </div>
    );
};