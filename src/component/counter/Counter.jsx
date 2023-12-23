import { useState } from 'react'
import CounterButton from './CounterButton'
import './counter.css'
export default function Counter(){
    const [count, setCount] = useState(0)

    function incrementCount(by){
        setCount(count + by)
    }

    function decrementCount(by){
        setCount(count - by)
    }
    function reset(){
        setCount(0)
    }

    return(
        <div>
            <span className="Count">{count}</span>
            <CounterButton by={1} incrementCount={incrementCount} decrementCount={decrementCount}/>
            <CounterButton by={5} incrementCount={incrementCount} decrementCount={decrementCount}/>
            <CounterButton by={10} incrementCount={incrementCount} decrementCount={decrementCount}/>
            <CounterButton incrementCount={incrementCount} decrementCount={decrementCount}/>
            <button className='ResetButton' onClick={reset}>Reset</button>
        </div>
       
    )
}
