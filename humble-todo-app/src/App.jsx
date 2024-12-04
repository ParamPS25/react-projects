import { useState } from "react"
import { Counter } from "./components/Counter"
import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"
import { Timer } from "./components/Timer"

function App() {

  // const todos = [
  //   {input : "alsdfkdlfjlsdkfj sdfkjsdf klsdjf sdkfj sdflkjs fs; kdfjs dlfkj sdkfj slkdfjls dkfjs l",complete: true},
  //   {input : "aaa",complete: false},
  // ]

  const [selectedTab,setSelectedTab] = useState("Open"); 

  const [todos,setTodos] = useState([{input:"hello! enter your first Todo",complete : false}])

  function handleAddTodo(newTodo){
      //cannont mutate original todo so will take copy of prev ...todos and appennd newTodo
      const newTodoList = [...todos , {input : newTodo , complete : false}]
      setTodos(newTodoList)
  }

  // will get the index of todo to be deleted , so filter out all remaining which are != index
  function handleDeleteTodos(todoIndex){
      let newTodoList = todos.filter((val,valIndex)=>{
          // console.log(val)
          return valIndex !== todoIndex
      })
      setTodos(newTodoList)
  }
  // return valIndex !== todoIndex:
  // If valIndex is not equal to todoIndex, the expression returns true, meaning the item is kept in the new array.
  // If valIndex equals todoIndex, the expression returns false, meaning the item is excluded from the new array.

  function handleCompleteTodo(todoIndex){
    let newTodoList = [...todos]
    let completedTodo = todos[todoIndex]
    completedTodo["complete"] = true 
    newTodoList[todoIndex] = completedTodo
    setTodos(newTodoList)
  }
  return (
    <>
        <Header todos = {todos} />
        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos = {todos} />

        <TodoList handleDeleteTodos = {handleDeleteTodos} 
            handleCompleteTodo = {handleCompleteTodo}
            selectedTab={selectedTab} todos = {todos} />

        <TodoInput  handleAddTodo = {handleAddTodo}/>
        <Counter />
        <Timer />
        
    </>
  )
}

export default App
