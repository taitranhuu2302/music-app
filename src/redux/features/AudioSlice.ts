import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentTime: 0,
};

const audioSlice = createSlice({
  name: 'AudioSlice',
  initialState,
  reducers: {
    updateCurrentTime: (state, { payload }: PayloadAction<number>) => {
      state.currentTime = payload;
    },
  },
});

export const { updateCurrentTime } = audioSlice.actions;

export default audioSlice.reducer;
