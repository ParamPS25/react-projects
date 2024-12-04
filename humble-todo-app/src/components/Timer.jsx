// useEffect(effectFunction, dependencyArray);
// -> Run Once on Mount             (When you pass an empty array ([]) as the dependency array, the effect runs only after the component mounts)
// -> Run When Dependencies Change  (When you pass dependencies, the effect runs whenever those dependencies change)
// -> Run After Every Render        (If no dependency array is provided, the effect runs after every render)

// 1. Effect Function
// The first argument to useEffect is the "effect function," which contains the code for your side effect.

// 2. Dependencies
//The second argument is a dependency array. It tells React when to re-run the effect:
// -> If the array is empty ([]), the effect runs only once (on mount).
// -> If it includes variables, the effect runs whenever those variables change.
// -> If omitted, the effect runs on every render (not recommended for most cases).

// 3. Cleanup Function
// The cleanup function runs:
// -> Before the effect re-runs: If the dependencies change, React runs the cleanup function first and then executes the effect again.
// -> When the component unmounts: If the component is removed from the UI, the cleanup function ensures any ongoing processes (e.g., intervals, subscriptions) are stopped.

import { useEffect, useState } from "react";

export function Timer(){
    
    const [time , setTime] = useState(0);
    const [isRunning , setRunning] = useState(false)

    useEffect(()=>{

        let timer;
        if(isRunning){
            timer = setInterval(()=>{
                setTime(time + 1)
            },1000);
        }

        // cleanup function : Before creating a new interval, React runs the cleanup function to clear the old interval,This ensures there is no overlapping interval from the previous render.
        return function(){
            clearInterval(timer)
        }

    },[time,isRunning])     // dependeds on both time and isRunning as setInterval updates time through setTime()

    return(
        <div>
            <h4>StopWatch</h4>
            <p onChange={(e)=>{console.log(e)}}>timer : {time}</p>

            <button onClick={()=>{
                setRunning(true)
            }}>Start</button>

            <button onClick={()=>{
                setRunning(false)
            }}>Pause</button>

            <button onClick={()=>{
                setRunning(false)
                setTime(0)
            }}>Reset</button>
        </div>
    )
}