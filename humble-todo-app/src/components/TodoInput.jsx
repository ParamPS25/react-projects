import { useState } from "react"

export function TodoInput(props){

    const {handleAddTodo} = props
    const [inputValue,setInputValue] = useState("")

    // console.log(inputValue);

        return(
            <div className="input-container">
                <input value={inputValue} onChange={(e)=>{
                    setInputValue(e.target.value)}} 
                    placeholder="Add your task" />

                <button onClick={()=>{
                    if (inputValue.trim() === "") {return}       // guard clause just to refuse addition of empty input value  
                    handleAddTodo(inputValue)
                    setInputValue("")            // clearing input value after adding to todolist
                    }}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
        )
}
//  By setting value={inputValue}, 
//  we ensure that the input field’s displayed value is always synchronized with the inputValue state.
//  When the state inputValue updates, the input field’s value will also update accordingly, and vice versa.

//  Real-Time Data Binding:
//  The input field's value changes in real-time as the user types, updating the state on every onChange event.

//  Accessing Input Value:

//  e.target refers to the DOM element that triggered the event (in this case, the input field).
//  e.target.value gives the current value of the input field, i.e., the text that the user has typed.
//  When we call setInputValue(e.target.value), we are updating the state to match the current value of the input field.
