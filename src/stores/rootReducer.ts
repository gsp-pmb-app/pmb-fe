import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './features/auth';

const dummyReducer = (state = {}) => state;

const privateReducer = combineReducers({
   _empty: dummyReducer,
});

const publicReducer = combineReducers({
   auth: authReducer,
});

export const rootReducer = combineReducers({
   private: privateReducer,
   public: publicReducer,
});
