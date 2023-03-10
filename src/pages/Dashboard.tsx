import * as React from "react";
import { TodoMain } from "../components/TodoListMain";
import { DatePickerExample } from "../components/DatePicker";

export const Dashboard = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Dashboard">
        <TodoMain />
        {/* <DatePickerExample /> */}
    </div>
));