export interface TodoListItem {
  id: number;
  listId: number;
  name: string;
  completed: boolean;
}

export interface CreateTodoListItemDto {
  name: string;
  listId: number;
}

export type UpdateTodoListItemDto = Partial<TodoListItem>;
