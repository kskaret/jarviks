import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  inputValue: '',
};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  }
});

export const { setInputValue } = inputSlice.actions;

export default inputSlice.reducer;
