import React, { useState } from 'react'

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if(!value) return
    addTodo(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)} />
    </form>
  )
}

function Todo({ todo, index }) {
  return(
    <div className="todo">{todo.text}</div>
  )
}

// set state within a function like you would a class this.setState with the useState hook
// the following assigns the value of useState to the 1st argument, todos
function App() {
  const [todos, setTodos] = useState([
    {
      text: 'Learn about React',
      isCompleted: false
    },
    {
      text: 'Meet friend',
      isCompleted: false
    },
    {
      text: 'Build todo app',
      isCompleted: false
    },
  ])

  const addTodo = text => {
    const newTodos = [...todos, { text }]
    setTodos(newTodos)
  }

  return(
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) =>
          <Todo key={index} index={index} todo={todo} />
        )}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )
}

export default App