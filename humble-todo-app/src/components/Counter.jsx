// basics to understand react useState Hook
// lifecycle of component : constructed -> mounted -> updated -> unmounted -> ..
// a state of component is a variable that holds some information that may change over the lifetime of component
// whenever the *value* of the state changes , the *component re-renders* itself with *updated values*

import React ,{useState} from "react";

export function Counter(){
    const [count,setCount] = useState(0);
    
    return(
        <div>
            <p>count is : {count}</p>
            <p>message is : {count} is {count%2===0 ? "even" : "odd"}</p>

            <div>
                <button onClick={()=>{setCount(count+1)}}>Increment</button>
                <button onClick={()=>{setCount(count-1)}}>Decrement</button>
                <button onClick = {()=>{setCount(0)}}>reset</button>
            </div>
        </div>
    )
}