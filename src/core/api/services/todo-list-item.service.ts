import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";
import type {
  TodoListItem,
  CreateTodoListItemDto,
  UpdateTodoListItemDto,
  ApiResponse,
} from "../types";

export class TodoListItemService {
  async create(
    data: CreateTodoListItemDto
  ): Promise<ApiResponse<TodoListItem>> {
    return apiClient.post<TodoListItem>(
      API_ENDPOINTS.todoListItems.create,
      data
    );
  }

  async update(
    id: number,
    data: UpdateTodoListItemDto
  ): Promise<ApiResponse<TodoListItem>> {
    return apiClient.put<TodoListItem>(
      API_ENDPOINTS.todoListItems.update(id),
      data
    );
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.todoListItems.delete(id));
  }

  async toggleComplete(id: number): Promise<ApiResponse<TodoListItem>> {
    return apiClient.patch<TodoListItem>(
      API_ENDPOINTS.todoListItems.update(id),
      { completed: true }
    );
  }
}

export const todoListItemService = new TodoListItemService();
