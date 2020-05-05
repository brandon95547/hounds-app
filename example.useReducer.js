import React, {useReducer} from 'react'

function reducer(state, action) {
  switch(action.type) {
    case "increment" :
      return state + 1
    case "decrement" :
      return state -1
    default :
      return state
  }
}

const App = () => {

  const [count, dispatch] = useReducer(reducer, 0)

  return(
    <div>
      <div>count: {count}</div>
      <button onClick={() => dispatch()}>increment</button>
      <button onClick={() => dispatch()}>decrement</button>
    </div>
  )
}