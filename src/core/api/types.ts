// Common API types and interfaces
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status: number;
  details?: Record<string, unknown>;
}

// Todo List types
export interface TodoListItem {
  id: number;
  listId: number;
  name: string;
  completed: boolean;
}

export interface TodoList {
  id: number;
  name: string;
  items: TodoListItem[];
}

// DTOs para crear y actualizar
export interface CreateTodoListDto {
  name: string;
}

export interface UpdateTodoListDto {
  name?: string;
}

export interface CreateTodoListItemDto {
  name: string;
  listId: number;
}

export interface UpdateTodoListItemDto {
  name?: string;
  completed?: boolean;
}
