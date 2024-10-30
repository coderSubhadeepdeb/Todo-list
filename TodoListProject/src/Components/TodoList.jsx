import React ,{ useState }from 'react'
import Form from './Form'
import {v4 as uuidv4} from 'uuid'
import Todo from './Todo'
import Edit from './Edit'

const TodoList=()=> {
    const [todoValue, setTodo] = useState([])

    const createTodo = todo =>{
        setTodo([...todoValue,{id:uuidv4(), task:todo, isEditing: false}])
    }  

    const deleteTodo = (id) => {
      setTodo(todoValue.filter((todo) => todo.id !== id));
    };
    const editTodo = (id) => {
      setTodo(
        todoValue.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    };
    const editTask = (task, id) => {
      setTodo(
        todoValue.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: false } : todo
        )
      );
    };
  return (
    <div>
      <div className='container bg-blue-950 mt-20 p-8 rounded-md'>
        <Form createTodo = {createTodo}/>
        {
         todoValue.map(todo => (
                 todo.isEditing ? (
                   <Edit key={todo.id} editTodo={(task) => editTask(task, todo.id)} task={todo.task} />
                  ) : (
                         <Todo task={todo.task} key={todo.id} deleteTodo={() => deleteTodo(todo.id)} editTodo={() => editTodo(todo.id)} />
                      )
            ))
          }

      </div>
    </div>
  )
}

export default TodoList
