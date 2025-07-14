import { ReactNode, useState, useEffect, useCallback } from "react";
import Layout from "../../../core/components/layout/Layout";
import { useTodoList, useUpdateTodoList } from "../../../core/api/hooks";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../../../core/components/inputs/primary-button/PrimaryButton";
import AddItemModal from "../components/update/add-item-modal/AddItemModal";
import { v4 as uuidv4 } from "uuid";
import IconButton from "../../../core/components/inputs/icon-button/IconButton";
import { LeftArrowIcon } from "../../../assets/icons";
import ListItem from "../components/list-item/LIstItem";
import { wsService } from "../../../core/api/websocket";

const TodoListDetailScreen = (): ReactNode => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!id) {
    throw new Error("List ID is required");
  }

  const { data: todoList, execute: refetchTodoList } = useTodoList(Number(id));

  const memoizedRefetch = useCallback(() => {
    console.log("🔄 REFETCH: memoizedRefetch called");
    refetchTodoList();
  }, [refetchTodoList]);

  const { mutate: updateTodoList } = useUpdateTodoList({
    onSuccess: () => {
      console.log("🔄 REFETCH: updateTodoList onSuccess callback triggered");
      memoizedRefetch();
    },
  });

  useEffect(() => {
    wsService.connect();

    const debugRefetch = (source: string) => {
      console.log(`🔄 REFETCH triggered by: ${source}`);
      memoizedRefetch();
    };

    const unsubscribeItemUpdate = wsService.subscribe(
      "todo-item-updated",
      (data: unknown) => {
        console.log("🎯 RECEIVED todo-item-updated event:", data);
        const eventData = data as {
          listId: string | number;
          itemId: string;
          completed: boolean;
        };

        const eventListId = String(eventData.listId);
        const currentListId = String(id);

        if (eventListId === currentListId) {
          console.log("✅ Event matches current list ID, triggering refetch");
          debugRefetch("WebSocket item-updated");
        } else {
          console.log("❌ Event for different list, ignoring");
        }
      }
    );

    const unsubscribeListUpdate = wsService.subscribe(
      "todo-list-updated",
      (data: unknown) => {
        console.log("🎯 RECEIVED todo-list-updated event:", data);
        const eventData = data as {
          listId: string | number;
          type: string;
          itemId?: string;
          timestamp?: string;
          data?: unknown;
        };

        const eventListId = String(eventData.listId);
        const currentListId = String(id);

        if (eventListId === currentListId) {
          console.log("✅ Event matches current list ID, triggering refetch");
          debugRefetch("WebSocket list-updated");
        } else {
          console.log("❌ Event for different list, ignoring");
        }
      }
    );

    wsService.joinList(Number(id));

    return () => {
      wsService.leaveList(Number(id));
      unsubscribeItemUpdate();
      unsubscribeListUpdate();
    };
  }, [id, memoizedRefetch]);

  if (!todoList) {
    return <Layout>Loading...</Layout>;
  }

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCreateItem = (itemName: string) => {
    const newItemId = uuidv4();

    updateTodoList({
      id: todoList.id,
      data: {
        name: todoList.name,
        items: [
          ...todoList.items,
          {
            id: newItemId,
            name: itemName,
            completed: false,
            listId: todoList.id,
          },
        ],
      },
    });

    wsService.emit("todo-list-updated", {
      listId: Number(todoList.id),
      type: "item-added",
      itemId: newItemId,
    });
  };

  const handleToggleComplete = (itemId: string) => {
    const item = todoList.items.find((item) => item.id === itemId);
    const newCompletedState = !item?.completed;

    const updatedItems = todoList.items.map((item) =>
      item.id === itemId ? { ...item, completed: newCompletedState } : item
    );

    updateTodoList({
      id: todoList.id,
      data: {
        name: todoList.name,
        items: updatedItems,
      },
    });

    wsService.notifyTodoItemUpdate(
      Number(todoList.id),
      itemId,
      newCompletedState
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout>
      <div className="header-container">
        <div className="container">
          <IconButton
            onClick={() => navigate(-1)}
            icon={<LeftArrowIcon color="#000" width="1.5rem" height="1.5rem" />}
            label="Back"
          />

          <h1>{todoList.name}</h1>
        </div>
        <PrimaryButton onClick={handleAddItem}>Add item</PrimaryButton>
      </div>

      {todoList.items.length === 0 ? (
        <div style={{ padding: "0 var(--spacing-xl)" }}>
          <h2
            style={{
              marginBottom: "var(--spacing-lg)",
              color: "var(--color-text-primary)",
            }}>
            Items
          </h2>
          <table className="list-items-table">
            <thead>
              <tr>
                <th>Completed</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="no-data">
                <td colSpan={2} className="no-data">
                  No items in this list
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ padding: "0 var(--spacing-xl)" }}>
          <h2
            style={{
              marginBottom: "var(--spacing-lg)",
              color: "var(--color-text-primary)",
            }}>
            Items
          </h2>
          <table className="list-items-table">
            <thead>
              <tr>
                <th>Completed</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {todoList.items.map((item) => (
                <ListItem
                  key={item.id}
                  item={item}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddItemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateItem}
      />
    </Layout>
  );
};

export default TodoListDetailScreen;
