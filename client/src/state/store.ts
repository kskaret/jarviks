import { configureStore, combineReducers } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import inputReducer from './inputTextSlice';
import recorderReducer from './recorderSlice';
import tokenReducer from './tokenSlice'

const rootReducer = combineReducers({
  chat: chatReducer,
  input: inputReducer,
  recorder: recorderReducer,
  token: tokenReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
