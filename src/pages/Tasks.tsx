import * as React from "react";
import { TodoMain } from "../components/TodoListMain";

export const Tasks = React.memo(() => (
  <div role="tabpanel" aria-labelledby="Tasks">
    <TodoMain />
  </div>
));