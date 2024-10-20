import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import SettingsReducer from './reducers/SettingsSlice';

// import { persistStore, persistReducer } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
   SettingsReducer,
});

// const persistConfig = {
//    key: 'root',
//    storage,
//    whitelist: [],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
