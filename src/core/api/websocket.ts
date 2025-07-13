import { io, Socket } from "socket.io-client";

type EventCallback = (data: unknown) => void;

class WebSocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, EventCallback[]> = new Map();

  connect() {
    if (this.socket?.connected) {
      console.log("🔌 Already connected to WebSocket");
      return;
    }

    console.log("🔌 Attempting to connect to WebSocket server on port 3000...");

    // Versión simplificada para debugging
    this.socket = io("http://localhost:3002");

    this.socket.on("connect", () => {
      console.log(`✅ Connected to WebSocket server, ID:`, this.socket?.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected from WebSocket server. Reason:", reason);
    });

    this.socket.on("connect_error", (error) => {
      console.error(`❌ Connection error:`, error.message);
      console.log(
        "💡 Make sure your NestJS backend has WebSocket Gateway configured!"
      );
    });

    // Escuchar todos los eventos y distribuir a los listeners
    this.socket.onAny((event, data) => {
      console.log("📨 WebSocket event received:", event, data);
      const listeners = this.listeners.get(event) || [];
      listeners.forEach((listener) => listener(data));
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  subscribe(event: string, callback: EventCallback) {
    console.log(`📋 Subscribing to event: ${event}`);
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);

    // Retornar función de cleanup
    return () => {
      console.log(`🗑️ Unsubscribing from event: ${event}`);
      const listeners = this.listeners.get(event) || [];
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  emit(event: string, data: Record<string, unknown>) {
    console.log(`📤 Emitting event: ${event}`, data);
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn("❌ Cannot emit - socket not connected");
    }
  }

  joinList(listId: number) {
    console.log(`🚪 Joining list room: ${listId}`);
    this.emit("join-list", { listId });
  }

  leaveList(listId: number) {
    console.log(`🚪 Leaving list room: ${listId}`);
    this.emit("leave-list", { listId });
  }

  notifyTodoItemUpdate(listId: number, itemId: string, completed: boolean) {
    console.log(
      `📝 Notifying todo item update: list=${listId}, item=${itemId}, completed=${completed}`
    );
    this.emit("todo-item-updated", {
      listId,
      itemId,
      completed,
    });
  }

  get isConnected() {
    return this.socket?.connected || false;
  }
}

export const wsService = new WebSocketService();
