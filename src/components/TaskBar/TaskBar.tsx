import './TaskBar.scss'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addTodo} from "../../store/todoSlice.ts";
import {ITodo} from "../../models/ITodo.ts";
import {v4 as uuid} from 'uuid';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineAddBox } from "react-icons/md";
import { ChipType } from '../Chip/Chip.tsx';

type Props = {
    isFolded: boolean;
    setIsFolded: any;
}

const TaskBar = ({setIsFolded, isFolded}: Props) => {
    const [text, setText] = useState<string>('');
    const dispatch = useDispatch();
    const handleSubmit = () => {
        if (text != ''){
            const todo: ITodo = {
                id: uuid(),
                status: ChipType.ACTIVE,
                text: text
            }
            dispatch(addTodo(todo));
            setText('');
        }
    }
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    }
    return (
        <div className={'TaskBar'}>
            {
                isFolded ? 
                <MdKeyboardArrowDown 
                    size={50} 
                    onClick={() => setIsFolded((prev: boolean) => !prev)} 
                    style={{flexShrink: 0, cursor: 'pointer'}}
                    data-testid="arrow-down"
                /> :
                <MdKeyboardArrowUp 
                    size={50} 
                    onClick={() => setIsFolded((prev: boolean) => !prev)} 
                    style={{flexShrink: 0, cursor: 'pointer'}}
                    data-testid="arrow-up"    
                />
            }
            <input className='TaskBar_input'
                   placeholder='What needs to be done?'
                   value={text}
                   onChange={(e) => setText(e.target.value)}
                   onKeyUp={handleKeyPress}
            />
            {text && <MdOutlineAddBox
                size={50}
                onClick={handleSubmit}
                data-testid="add-icon"
            />}
        </div>

    );
};

export default TaskBar;