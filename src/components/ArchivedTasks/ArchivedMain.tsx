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

    return (
        <div className={styles.root}>
            <Card className={styles.card} appearance="filled-alternative">
                <h2>Archived Tasks</h2>
                <ArchivedList todos={props.archivedTodos} deleteTodo={props.deleteTodoArchive} toggleComplete={props.toggleCompleteArchive}/>

                <Label>There are {props.archivedTodos.length} archived tasks.</Label>
            </Card>
        </div>
    );
};