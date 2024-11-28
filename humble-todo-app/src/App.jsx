import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"

function App() {

  const todos = [
    {input : "alsdfkdlfjlsdkfj sdfkjsdf klsdjf sdkfj sdflkjs fs; kdfjs dlfkj sdkfj slkdfjls dkfjs l",complete: true},
    {input : "aaa",complete: false},
  ]
  return (
    <>
        <Header todos = {todos} />
        <Tabs todos = {todos} />
        <TodoList todos = {todos} />
        <TodoInput />
    </>
  )
}

export default App
