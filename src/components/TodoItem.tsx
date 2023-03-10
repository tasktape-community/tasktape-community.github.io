import React, { useState } from 'react';
import { Button, makeStyles, Checkbox } from '@fluentui/react-components';
import { DeleteRegular } from '@fluentui/react-icons';

/* ------------------------------ Icons ------------------------------ */
const Delete = DeleteRegular;

/* ------------------------------ Styles ------------------------------ */
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        width: 'auto',
        height: 'auto',
        boxSizing: 'border-box',
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'nowrap',
        width: 'auto',
        height: 'auto',
        boxSizing: 'border-box',
    },
});

/* ------------------------------ TodoItem ------------------------------ */
export const TodoItem = (props: any) => {
    const [, setOpenModal] = useState(true);

    const deleteTodo = (id: number) => {
        props.deleteTodo(id);
        setOpenModal(true);
    }

    const styles = useStyles();

    return (
    <div className={styles.root}>
        <div className={styles.flex}>
            <Checkbox style={{ maxWidth: "100px" }} label={props.todo.name} checked={props.todo.completed} onChange={() => props.toggleComplete(props.todo.id)} />

            <Button icon={<Delete />} onClick={() => deleteTodo(props.todo.id)} />
        </div>
    </div>
    )
}