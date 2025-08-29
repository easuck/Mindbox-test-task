import './Task.scss'
import {ITodo} from "../../models/ITodo.ts";
import {useDispatch} from "react-redux";
import { MdOutlineCheckCircle, MdOutlineCircle } from 'react-icons/md';
import { changeTodoStatus } from '../../store/todoSlice.ts';
import { ChipType } from '../Chip/Chip.tsx';

type Props = {
    todo: ITodo
}

const Task = ({todo}: Props) => {
    const dispatch = useDispatch();
    const changeStatus = () => {
        dispatch(changeTodoStatus(todo));
    }
    
    return (
        <div className='Task'>
            <div className='Task_content'>
                {todo.status == ChipType.ACTIVE ? 
                    <MdOutlineCircle size={30} onClick={changeStatus} className='Task_content_status'/> : 
                    <MdOutlineCheckCircle size={30} onClick={changeStatus} className='Task_content_status'/>
                }
                <h2 className={`${todo.status == ChipType.COMPLETED ? 'completed' : ''}`}>{todo.text}</h2>
            </div>
        </div>
    );
};

export default Task;