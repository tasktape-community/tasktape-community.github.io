
import {
    makeStyles,
    Button,
    Label,
} from "@fluentui/react-components";
import React from 'react';

const useStyles = makeStyles({
    root: {
        display: "flex",
        rowGap: "5px",
        alignItems: "center",
        justifyContent: "space-between",
    },
});



export const TodoFooter = (props: any) => {
    const styles = useStyles();

    return (
    <div className={styles.root}>
        <Label>{props.todos.filter((todo: any) => !todo.completed).length} items remaining</Label>

        <Button aria-label="inline" type="submit" onClick={() => props.archiveCompleted()}>
            Archive Completed ({props.todos.filter((todo: any) => todo.completed).length})
        </Button>
    </div>
    );
};