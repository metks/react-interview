// API Configuration
export const API_CONFIG = {
  baseURL: "http://localhost:3000",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
} as const;

export const API_ENDPOINTS = {
  todoLists: {
    getAll: "/api/todolists",
    create: "/api/todolists",
    getById: (id: number) => `/api/todolists/${id}`,
    update: (id: string) => `/api/todolists/${id}`,
    delete: (id: string) => `/api/todolists/${id}`,
  },

  // Todo List Items
  todoListItems: {
    create: "/todo-list-items",
    update: (id: number) => `/todo-list-items/${id}`,
    delete: (id: number) => `/todo-list-items/${id}`,
  },
} as const;
