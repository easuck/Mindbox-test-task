import './TaskList.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Chip, { ChipType } from '../Chip/Chip';
import { SetStateAction } from 'react';
import { clearCompleted } from '../../store/todoSlice';

type Props = {
    children: React.ReactNode;
    isFolded: boolean;
    selectedChip: ChipType;
    setSelectedChip: React.Dispatch<SetStateAction<ChipType>>
}

const TaskList = ({children, isFolded, selectedChip, setSelectedChip}: Props) => {
    const todos = useAppSelector(state => state.todos.todos);
    const dispatch = useAppDispatch();

    return (
        <>
            <div className={`TaskList ${isFolded ? 'folded' : ''}`}>
                {children}
            </div>
            <div className='ActionBar'>
                <div>{todos.length} items left</div>
                <div className='TaskList_chips'>
                    <Chip name={ChipType.ALL} 
                        setSelectedChip={setSelectedChip}
                        selectedChip={selectedChip}
                    />
                    <Chip name={ChipType.ACTIVE} 
                        setSelectedChip={setSelectedChip}
                        selectedChip={selectedChip}
                    />
                    <Chip name={ChipType.COMPLETED} 
                        setSelectedChip={setSelectedChip}
                        selectedChip={selectedChip}
                    />
                </div>
                <div style={{cursor: 'pointer'}} 
                    onClick={() => dispatch(clearCompleted())}
                >
                    Clear completed
                </div>
            </div>
        </>
        
    );
};

export default TaskList;