import { TodoCard } from "./TodoCard"

export function TodoList(props){
    const { todos, selectedTab } = props

    const filteredTodosList = selectedTab === "All" ? todos : 
        selectedTab == "Open" ? 
        todos.filter((val) => !val.complete) :
        todos.filter((val)=>   val.complete)

    return(
        <>
            {filteredTodosList.map((todo,todoIndex)=>{

                  // Find the original index of the todo in the main todos array
                  const originalIndex = todos.indexOf(todo);

                return(
                    <TodoCard 
                        key={todoIndex}  // Use the index as the key

                        // todoIndex = {todoIndex} bug: should look for index in original arr todos not filtered arr , so that todoList remain consistent through out all tabs(open,all,completed) 
                        //else creates bug if clicked done or delete button on open tab 
                        // todoIndex = {todos.findIndex((val)=>{val.input == todo.input})} //bug :it can fail if todos have duplicate input values
                       
                        todoIndex = {originalIndex} // Pass the original index
                        {...props}              
                        todo = {todo} />
                )
            })}
        </>
    )
}