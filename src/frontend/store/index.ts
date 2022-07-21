import { configureStore } from '@reduxjs/toolkit'
// import {
// persistReducer,
// persistStore,
// FLUSH,
// REHYDRATE,
// PAUSE,
// PERSIST,
// PURGE,
// REGISTER,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

export const store = configureStore({
  reducer: {},

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
})

// export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
