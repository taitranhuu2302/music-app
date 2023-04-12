import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
};

const searchSlice = createSlice({
  name: 'SearchSlice',
  initialState,
  reducers: {
    handleSearch: (state, { payload }: PayloadAction<string>) => {
      state.keyword = payload;
    },
  },
});

export const { handleSearch } = searchSlice.actions;

export default searchSlice.reducer;
