import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentTime: 0,
  currentTimeTemp: 0,
};

const audioSlice = createSlice({
  name: 'AudioSlice',
  initialState,
  reducers: {
    updateCurrentTime: (state, { payload }: PayloadAction<number>) => {
      state.currentTime = payload;
    },
    updateCurrentTimeTemp: (state, {payload}: PayloadAction<number>) => {
      state.currentTimeTemp = payload;
    }
  },
});

export const { updateCurrentTime, updateCurrentTimeTemp } = audioSlice.actions;

export default audioSlice.reducer;
