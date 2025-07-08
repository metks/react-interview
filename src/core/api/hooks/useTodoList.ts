import { useApi, useMutation } from "./useApi";
import { todoListService } from "../services/todo-list.service";
import { CreateTodoListDto, UpdateTodoListDto } from "../../models/todo-list";

// Hook para obtener todas las listas
export function useTodoLists() {
  return useApi(() => todoListService.getAll(), { immediate: true });
}

// Hook para obtener una lista por ID
export function useTodoList(id: number, options?: { enabled?: boolean }) {
  return useApi(() => todoListService.getById(id), {
    immediate: options?.enabled ?? true,
  });
}

// Hook para crear una nueva lista
export function useCreateTodoList(options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
}) {
  return useMutation(
    (data: CreateTodoListDto) => todoListService.create(data),
    {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    }
  );
}

// Hook para actualizar una lista
export function useUpdateTodoList(options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
}) {
  return useMutation(
    ({ id, data }: { id: string; data: UpdateTodoListDto }) =>
      todoListService.update(id, data),
    {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    }
  );
}

// Hook para eliminar una lista
export function useDeleteTodoList(options?: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) {
  return useMutation((id: string) => todoListService.delete(id), {
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
