import { useMutation } from "./useApi";
import { todoListItemService } from "../services/todo-list-item.service";
import type { CreateTodoListItemDto, UpdateTodoListItemDto } from "../types";

// Hook para crear un nuevo item
export function useCreateTodoListItem(options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
}) {
  return useMutation(
    (data: CreateTodoListItemDto) => todoListItemService.create(data),
    {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    }
  );
}

// Hook para actualizar un item
export function useUpdateTodoListItem(options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
}) {
  return useMutation(
    ({ id, data }: { id: number; data: UpdateTodoListItemDto }) =>
      todoListItemService.update(id, data),
    {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    }
  );
}

// Hook para eliminar un item
export function useDeleteTodoListItem(options?: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) {
  return useMutation((id: number) => todoListItemService.delete(id), {
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// Hook para toggle del estado completed
export function useToggleTodoListItemComplete(options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
}) {
  return useMutation((id: number) => todoListItemService.toggleComplete(id), {
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
