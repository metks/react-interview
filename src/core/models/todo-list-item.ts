export interface TodoListItem {
  id: string;
  listId: string;
  name: string;
  completed: boolean;
}

export interface CreateTodoListItemDto {
  name: string;
  listId: string;
}

export type UpdateTodoListItemDto = Partial<TodoListItem>;
