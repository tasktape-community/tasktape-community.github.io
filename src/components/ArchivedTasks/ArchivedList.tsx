
import {
    makeStyles,
    shorthands,
    Label,
} from "@fluentui/react-components";
import { ArchivedItem } from "./ArchivedItem";

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



export const ArchivedList = (props: any) => {
    const styles = useStyles();

    return (
    <div className={styles.root}>
        { props.todos.length > 0 ? props.todos.map((todo: any) => (
            <ArchivedItem todo={todo} key={todo.id} deleteTodo={props.deleteTodo} checkedTodo={props.checkedTodo} toggleComplete={props.toggleComplete}/>
        )): 
        <Label>There are no archived tasks.</Label>
        }
    </div>
    );
};