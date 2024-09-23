import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
// import userReducer from '../features/user/userSlice';   

// ... importar otros reducers

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // user: userReducer,
    // ... otros reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;