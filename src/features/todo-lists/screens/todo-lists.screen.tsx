import { ReactNode } from "react";
import Layout from "../../../core/components/layout/Layout";
import Create from "../components/Create";

const TodoListsScreen = (): ReactNode => {
  const handleCreate = () => {
    // Logic to handle the creation of a new todo list
    console.log("Create new todo list");
  };

  return (
    <Layout>
      <div>
        <h1>Todo Lists</h1>
        <Create onCreate={handleCreate} />
      </div>
    </Layout>
  );
};

export default TodoListsScreen;
