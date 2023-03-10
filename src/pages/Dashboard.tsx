import * as React from "react";
import { TodoMain } from "../components/TodoListMain";

export const Dashboard = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Dashboard">
        <TodoMain />
    </div>
));