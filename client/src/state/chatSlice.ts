import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

type Message = {
  role: string;
  content: string;
};

const initialState = {
  chatMessages: [] as Message[],
  isLoading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatMessages: (state, action: PayloadAction<Message[]>) => {
      state.chatMessages = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  }
});

export const { setChatMessages, setIsLoading } = chatSlice.actions;
export const selectIsLoading = (state: RootState) => state.chat.isLoading;

export default chatSlice.reducer;
