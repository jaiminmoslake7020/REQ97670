import {createSlice} from '@reduxjs/toolkit';
import {CurrentPositionSliceType} from '../../types/types';

export const initialState = {
  position: undefined,
} as CurrentPositionSliceType;

export const slice = createSlice({
  name: 'adsData',
  initialState: initialState,
  reducers: {
    setPosition: (state:CurrentPositionSliceType, action) => {
      // eslint-disable-next-line no-param-reassign
      state.position = action.payload;
    },
    resetPosition: (state:CurrentPositionSliceType) => {
      // eslint-disable-next-line no-param-reassign
      state.position = undefined;
    },
  },
});

export const { actions, reducer } = slice;

export const {
  setPosition, resetPosition,
} = actions;

export default reducer;
