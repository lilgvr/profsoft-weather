import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useAppDispatch: () => AppDispatch = useDispatch;

export { useAppSelector, useAppDispatch }
