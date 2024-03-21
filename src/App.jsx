import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addTodo, toggleTodo, deleteTodo } from './Redux/todoSlice';
import './App.css'

function App() {

  const [inputText, setInputText] = useState('')

  const dispatch = useDispatch()

  const todos = useSelector(state => state.todos.todos)

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      dispatch(
        addTodo({
          id: uuidv4(),
          text: inputText,
          completed: false,
        })
      );
      setInputText('');
    }
  }

  const handleDisplayTodo = id => {
    dispatch(toggleTodo(id));
  }

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  }

  return (
    <>
    <div className="contaienr">
      <h1 className='mt-3'>To Do App</h1>
      <input className='mt-5 w-25 p-2' type="text" value={inputText} onChange={e => setInputText(e.target.value)}/>
      <button className='ms-3 btn btn-success' onClick={handleAddTodo}>Add Todo</button>
     <div className='container-fluid'>
        <div style={{backgroundColor:'red',height:"65vh"}} className='row mt-5 p-5'>
          <ul>
            {todos.map(todo => (
              <li
                key={todo.id}
                className={todo.completed ? 'completed' : ''} text-center
                onClick={() => handleDisplayTodo(todo.id)}
              >
                {todo.text}
                <button className='float-end btn btn-warning' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
     </div>
    </div>
    </>
  )
}

export default App
