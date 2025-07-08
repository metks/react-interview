import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { ROUTES } from "../constants/routes";
import TodoListsScreen from "../../features/todo-lists/screens/todo-lists.screen";
import TodoListDetailScreen from "../../features/todo-lists/screens/todo-list-detail.screen";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.HOME}>
      <Route path={ROUTES.HOME} element={<TodoListsScreen />} />
      <Route path={ROUTES.LIST_DETAIL} element={<TodoListDetailScreen />} />
    </Route>
  )
);
