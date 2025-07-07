import { ReactNode } from "react";
import Layout from "../../../core/components/layout/Layout";
import Create from "../components/Create";
import { useCreateTodoList, useTodoLists } from "../../../core/api/hooks";
import "./styles.css";

const TodoListsScreen = (): ReactNode => {
  const { data, loading, execute: refetchLists } = useTodoLists();
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
      {data && (
        <div>
          <p>Found {data.length} todo lists</p>
          {data.map((list) => (
            <div key={list.id}>
              <h3>{list.name}</h3>
              <p>{list.items.length} items</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default TodoListsScreen;
