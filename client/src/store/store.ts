import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { api } from '@/services/api/api';

import { userSlice } from './user/user.slice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  user: userSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
