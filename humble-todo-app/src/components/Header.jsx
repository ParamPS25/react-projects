export function Header(props){
    const { todos } = props
    const taskOrTasks = todos.length > 1 ? "tasks" : "task"

    return(
        <header>
            <h1 className="text-gradient"> You have {todos.length} open {taskOrTasks} </h1>
        </header>
    )
}