import {
  CreateTodoListDto,
  TodoList,
  UpdateTodoListDto,
} from "../../models/todo-list";
import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";
import type { ApiResponse } from "../types";

export class TodoListService {
  async getAll(): Promise<ApiResponse<TodoList[]>> {
    return apiClient.get<TodoList[]>(API_ENDPOINTS.todoLists.getAll);
  }

  async getById(id: number): Promise<ApiResponse<TodoList>> {
    return apiClient.get<TodoList>(API_ENDPOINTS.todoLists.getById(id));
  }

  async create(data: CreateTodoListDto): Promise<ApiResponse<TodoList>> {
    return apiClient.post<TodoList>(API_ENDPOINTS.todoLists.create, data);
  }

  async update(
    id: string,
    data: UpdateTodoListDto
  ): Promise<ApiResponse<TodoList>> {
    return apiClient.put<TodoList>(API_ENDPOINTS.todoLists.update(id), data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.todoLists.delete(id));
  }
}

export const todoListService = new TodoListService();
