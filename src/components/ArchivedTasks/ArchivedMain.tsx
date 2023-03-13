import {
    Label,
    makeStyles,
    shorthands,
} from "@fluentui/react-components";
import { Card } from '@fluentui/react-components/unstable';
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
        flexGrow: 1,
    },
});

/* ------------------------------ ArchivedMain ------------------------------ */
export const ArchivedMain = (props: any) => {
    const styles = useStyles();

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

    return (
        <div className={styles.root}>
            <Card className={styles.card} appearance="filled-alternative">
                <h2>Archived Tasks</h2>
                <ArchivedList 
                    todos={props.todos.filter((todo: any) => todo.archived === true)}
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                />

                <Label>There are {props.todos.filter((todo: any) => todo.archived === true).length} archived tasks.</Label>
            </Card>
        </div>
    );
};