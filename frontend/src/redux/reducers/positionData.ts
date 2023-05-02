import {createSlice} from '@reduxjs/toolkit';
import {PositionsDataSliceType} from '../../types/types';

export const initialState = {
  positions: [],
  loading: true,
} as PositionsDataSliceType;

export const slice = createSlice({
  name: 'adsData',
  initialState: initialState,
  reducers: {
    setPositions: (state:PositionsDataSliceType, action) => {
      console.log('action.payload', action.payload);
      // eslint-disable-next-line no-param-reassign
      state.positions = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
    },
    setPositionsLoading: (state:PositionsDataSliceType, action) => {
      // eslint-disable-next-line no-param-reassign
      state.positions = action.payload;
    },
  },
});

export const { actions, reducer } = slice;

export const {
  setPositions, setPositionsLoading,
} = actions;

export default reducer;
