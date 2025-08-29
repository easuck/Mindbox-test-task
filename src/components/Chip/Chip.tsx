import { SetStateAction } from 'react';
import './Chip.scss';

type Props = {
    name: ChipType,
    setSelectedChip: React.Dispatch<SetStateAction<ChipType>>,
    selectedChip: ChipType
}

export enum ChipType {
    ALL = 'All',
    ACTIVE = 'Active',
    COMPLETED = 'Completed'
}

const Chip = ({name, setSelectedChip, selectedChip}: Props) => {
    return(
        <div className={`Chip ${name == selectedChip ? 'Chip_selected' : ''}`} 
        onClick={() => setSelectedChip(name)}>
            {name}
        </div>
    )
}

export default Chip;