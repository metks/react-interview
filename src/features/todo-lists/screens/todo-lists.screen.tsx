import { ReactNode } from "react";
import Layout from "../../../core/components/layout/Layout";
import { useCreateTodoList, useTodoLists } from "../../../core/api/hooks";
import "./styles.css";
import TodoListTable from "../components/todo-list-table/TodoListTable";
import Create from "../components/create/Create";

const TodoListsScreen = (): ReactNode => {
  const { data: todoLists, loading, execute: refetchLists } = useTodoLists();
  const { mutate: createList } = useCreateTodoList({
    onSuccess: () => {
      refetchLists();
    },
  });

  const handleCreate = (listName: string) => {
    createList({ name: listName });
  };

  return (
    <Layout>
      <div className="container">
        <h1>Todo Lists</h1>
        <Create onCreate={handleCreate} />
      </div>
      {loading && <p>Loading todo lists...</p>}
      {todoLists && (
        <div>
          <TodoListTable list={todoLists} />
        </div>
      )}
    </Layout>
  );
};

export default TodoListsScreen;
