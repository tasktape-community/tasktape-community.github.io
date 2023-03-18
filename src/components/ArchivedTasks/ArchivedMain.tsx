import {
    Label,
    makeStyles,
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
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    content: {
        display: "flex",
        maxWidth: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        rowGap: "5px",
    },
});

/* ------------------------------ ArchivedMain ------------------------------ */
export const ArchivedMain = (props: any) => {
    const styles = useStyles();
    
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
                <div className={styles.content}>
                    <div>
                        <h2>Archived Tasks</h2>
                        <ArchivedList
                            todos={props.todos.filter((todo: any) => todo.archived === true)}
                            deleteTodo={deleteTodo}
                            toggleComplete={toggleComplete}
                        />
                    </div>
                    <div>
                        <Label>There are {props.todos.filter((todo: any) => todo.archived === true).length} archived tasks.</Label>
                    </div>
                </div>
            </Card>
        </div>
    );
};