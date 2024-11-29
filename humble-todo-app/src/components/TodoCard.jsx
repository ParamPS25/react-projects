export function TodoCard(props) {
    const { todo ,handleDeleteTodos ,handleCompleteTodo, todoIndex} = props
    // console.log(todoIndex)
    return (
        <div className="card todo-item">
            <p>{todo.input}</p>
            <div className="todo-buttons">
                <button onClick={()=>{
                    handleCompleteTodo(todoIndex)
                }} >
                    <h6>Done</h6>
                </button>
                <button onClick={()=>{
                    handleDeleteTodos(todoIndex)
                }}>
                    <h6>Delete</h6>
                </button>
            </div>
        </div>
    )
}