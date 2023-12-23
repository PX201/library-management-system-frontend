import {PropTypes} from 'prop-types'

export default function CounterButton({by, incrementCount, decrementCount}){
    
    return(
        <div className="Counter">
            <div>
                <button className="CounterButton" onClick={() => decrementCount(by)}>-{by}</button>
                <button className="CounterButton" onClick={() => incrementCount(by)}>+{by}</button>
            </div>
        </div>
    )
}

CounterButton.propTypes = {
    by: PropTypes.number
}
CounterButton.defaultProps ={
    by: 3
}
