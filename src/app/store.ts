import {
    configureStore, 
    ThunkAction, 
    Action } from '@reduxjs/toolkit';
import categoryReducer, { categoriesApiSlice } from '../features/categories/Slice';
import { apiSlice } from '../features/api/apiSlice';


export const store =  configureStore({
    reducer: {
        categories: categoryReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [categoriesApiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          serializableCheck: false, // works in the app, but doesn't in tests - I still see the error log there
        }).concat(apiSlice.middleware);
      }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType, 
RootState, 
unknown, 
Action<string>
>