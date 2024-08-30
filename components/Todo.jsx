import DarkMode from "./DarkMode";
import Layout from "./Layout";
import Pomo from "./Pomo";
import TodoApp from "./TodoApp";

export default function Todo() {
  return (
    <Layout>
      <DarkMode />
      <TodoApp/>
    </Layout>
  );
}
