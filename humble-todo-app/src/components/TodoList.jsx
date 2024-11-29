import { TodoCard } from "./TodoCard"

export function TodoList(props){
    const {selectedTab , todos } = props

    const filteredTodosList = selectedTab === "All" ? todos : 
        selectedTab == "Open" ? 
        todos.filter((val) => !val.complete) :
        todos.filter((val)=>   val.complete)

    return(
        <>
            {filteredTodosList.map((todo,todoIndex)=>{
                return(
                    <TodoCard 
                        key={todoIndex} 
                        todoIndex = {todoIndex}
                        {...props}              
                        todo = {todo} />
                )
            })}
        </>
    )
}