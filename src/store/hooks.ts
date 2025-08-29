import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Типизированная версия useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Типизированная версия useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
