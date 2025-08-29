import './App.scss'
import Task from './components/Task/Task'
import TaskBar from './components/TaskBar/TaskBar'
import TaskList from './components/TaskList/TaskList'
import { useState } from 'react'
import { useAppSelector } from './store/hooks'
import { ChipType } from './components/Chip/Chip'

const App = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const [isFolded, setIsFolded] = useState<boolean>(false);
  const [selectedChip, setSelectedChip] = useState<ChipType>(ChipType.ALL);
  return(
    <div className='mainPage'>
      <h1>todos</h1>
      <TaskBar setIsFolded={setIsFolded} isFolded={isFolded}/>
      <TaskList isFolded={isFolded} selectedChip={selectedChip} setSelectedChip={setSelectedChip}>
        {todos?.map(todo => {
            return (todo.status == selectedChip || selectedChip == ChipType.ALL) && <Task todo={todo}/> 
        })}
      </TaskList>
    </div>
  )
}

export default App
