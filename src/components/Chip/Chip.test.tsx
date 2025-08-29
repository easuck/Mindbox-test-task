import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chip, { ChipType } from './Chip'

describe('Chip Component', () => {
    const mockSetSelectedChip = vi.fn()

    test('renders chip with correct text', () => {
        render(
        <Chip 
            name={ChipType.ALL} 
            setSelectedChip={mockSetSelectedChip}
            selectedChip={ChipType.ACTIVE}
        />
        )
        
        expect(screen.getByText('All')).toBeInTheDocument()
    })

    test('applies selected class when chip is selected', () => {
        render(
        <Chip 
            name={ChipType.ALL} 
            setSelectedChip={mockSetSelectedChip}
            selectedChip={ChipType.ALL}
        />
        )
        
        const chip = screen.getByText('All')
        expect(chip).toHaveClass('Chip_selected')
    })

    test('calls setSelectedChip when clicked', async () => {
        const user = userEvent.setup()
        
        render(
        <Chip 
            name={ChipType.ALL} 
            setSelectedChip={mockSetSelectedChip}
            selectedChip={ChipType.ACTIVE}
        />
        )
        
        const chip = screen.getByText('All')
        await user.click(chip)
        
        expect(mockSetSelectedChip).toHaveBeenCalledWith(ChipType.ALL)
    })
})