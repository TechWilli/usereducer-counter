import React, { useState, useEffect, useCallback, useReducer, useRef } from 'react'
import './App.css'

// definindo os valores iniciais do state
const initialState = {
  counter: 0
}

// definindo a função reducer que cuidará da atualização do state
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        counter: state.counter + 1
      }
    case 'DECREMENT':
      return {
        counter: state.counter - 1
      }
    case 'ADD_CUSTOM_VALUE':
      return {
        counter: state.counter + action.payload
      }
    default:
      return {
        ...state
      }
  }
}

function App() {

  const [counterNumberEffect, setCounterNumberEffect] = useState(false)
  
  // passando como parâmetro para o hook a função de reducer e o state inicial criado
  // com o destructuring conseguimos o state que será atualizado e uma função dispatch
  const [counterState, dispatch] = useReducer(counterReducer, initialState)

  const addOrSubtract = useRef(null)
  const timeoutRef = useRef(null)

  const { counter } = counterState

  const handleIncrement = useCallback(() => {
    // a fução dispatch recebe um objeto com o type da action
    dispatch({ type: 'INCREMENT' })

    // para passar valores para o dispatch, basta enviálos na key "payload"
    // dispatch({
    //   type: 'ADD_CUSTOM_VALUE',
    //   payload: 10
    // })

    addOrSubtract.current = '+1'

    setCounterNumberEffect(true)
  }, [])

  const handleDecrement = useCallback(() => {
    // a fução dispatch recebe um objeto com o type da action
    dispatch({ type: 'DECREMENT' })
    addOrSubtract.current = '-1'

    setCounterNumberEffect(true)
  }, [])

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCounterNumberEffect(false)
    }, 300)

    return () => clearTimeout(timeoutRef.current)

  }, [counterNumberEffect])

  return (
    <div className="container">
      <h1>Contador com o hook useReducer</h1>
      <div className="counter-area">
        <button className="center-decrement" onClick={handleDecrement}>-</button>

        <div className="counter-value">
          <span className={`change ${counterNumberEffect && 'change-effect'}`}>{addOrSubtract.current}</span>
          <span>{counter}</span>
        </div>

        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}

export default App
