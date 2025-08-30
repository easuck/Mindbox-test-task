import './TaskList.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Chip, { ChipType } from '../Chip/Chip';
import { SetStateAction } from 'react';
import { clearCompleted } from '../../store/todoSlice';
import { useMediaQuery } from 'react-responsive';

type Props = {
    children: React.ReactNode;
    isFolded: boolean;
    selectedChip: ChipType;
    setSelectedChip: React.Dispatch<SetStateAction<ChipType>>
}

const TaskList = ({children, isFolded, selectedChip, setSelectedChip}: Props) => {
    const todos = useAppSelector(state => state.todos.todos);
    const dispatch = useAppDispatch();
    const isSmall = useMediaQuery({ maxWidth: 700 });

    return (
        <>
            <div className={`TaskList ${isFolded ? 'folded' : ''}`}>
                {children}
            </div>
            {isSmall && (
                <div className='ActionBar'>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <div>{todos.length} items left</div>
                        <div style={{cursor: 'pointer'}} 
                        onClick={() => dispatch(clearCompleted())}
                        >
                            Clear completed
                        </div>
                    </div>
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
                </div>
            )}
            {!isSmall && (
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
            )}
        </>   
    );
};

export default TaskList;