import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
  isRecording: false,
  mediaRecorder: null as MediaRecorder | null,
};

const recorderSlice = createSlice({
  name: 'recorder',
  initialState,
  reducers: {
    setIsRecording: (state, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload;
    },
    setMediaRecorder: (state, action: PayloadAction<MediaRecorder | null>) => {
      state.mediaRecorder = action.payload;
    },
  }
});

export const { setIsRecording, setMediaRecorder } = recorderSlice.actions;
export const selectMediaRecorder = (state: RootState) => state.recorder.mediaRecorder;
export default recorderSlice.reducer;
