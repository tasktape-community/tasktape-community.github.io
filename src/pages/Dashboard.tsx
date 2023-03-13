import * as React from "react";
import { TodoMain } from "../components/TaskList/TodoListMain"

export const Dashboard = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Dashboard">
        <TodoMain />
    </div>
));