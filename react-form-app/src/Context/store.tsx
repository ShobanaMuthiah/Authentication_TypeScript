import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './Slice/UserSlice';
import  { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
const rootReducer=combineReducers({
    user:userReducer
})
const persistConfig={
    key:"root",
    storage,
    version:1
}
const persistedReducer=persistReducer(persistConfig,rootReducer)
export const store=configureStore({
    reducer:persistedReducer,
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
})
export const persistor=persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch;