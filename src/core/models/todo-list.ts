import { TodoListItem } from "./todo-list-item";

export interface TodoList {
  id: string;
  name: string;
  items: TodoListItem[];
}

export interface CreateTodoListDto {
  name: string;
}

export type UpdateTodoListDto = Partial<TodoList>;
