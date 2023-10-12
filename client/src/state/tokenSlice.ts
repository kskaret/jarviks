import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface TokenState {
  tokensUsed: number;
}

const initialState: TokenState = {
  tokensUsed: 0,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokensUsed: (state, action: PayloadAction<number>) => {
      state.tokensUsed = action.payload;
    },
  },
});

export const { setTokensUsed } = tokenSlice.actions;
export const selectTokensUsed = (state: RootState) => state.token.tokensUsed
export default tokenSlice.reducer;
