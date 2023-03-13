import * as React from "react";
import { TodoMain } from "../components/TaskList/TodoListMain";
import { ArchivedMain } from "../components/ArchivedTasks/ArchivedMain";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    columnGap: "20px",
  },
});

export const Tasks = React.memo(() => (
  <div role="tabpanel" aria-labelledby="Tasks" className={useStyles().root}>
    <TodoMain />
    <ArchivedMain />
  </div>
));