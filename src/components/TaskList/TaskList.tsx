import './TaskList.scss'
import { useAppSelector } from '../../store/hooks';

type Props = {
    children: React.ReactNode;
    isFolded: boolean;
}

const TaskList = ({children, isFolded}: Props) => {
    const todos = useAppSelector(state => state.todos.todos);
    return (
        <>
            <div className={`TaskList ${isFolded ? 'folded' : ''}`}>
                {children}
            </div>
            <div className='ActionBar'>
                <div>{todos.length} items left</div>
                <div>123</div>
                <div>Clear completed</div>
            </div>
        </>
        
    );
};

export default TaskList;