import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  PositionsDataSliceType,
  CurrentPositionSliceType
} from '../types/types';
import positionData from './reducers/positionData';
import currentPosition from './reducers/currentPosition';

export const store = configureStore({
  reducer: {
    positionData,
    currentPosition,
  }
});

export type ReduxStoreStateType = {
  positionData: PositionsDataSliceType,
  currentPosition: CurrentPositionSliceType
};

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReduxStoreStateType> = useSelector;

export default store;
