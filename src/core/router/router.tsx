import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { ROUTES } from "../constants/routes";
import TodoListsScreen from "../../features/todo-lists/screens/todo-lists.screen";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.HOME}>
      {/* Public routes - redirect to dashboard if authenticated */}
      <Route path={ROUTES.HOME} element={<TodoListsScreen />} />
    </Route>
  )
);
