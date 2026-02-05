import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './features/auth';
import { pendaftarReducer } from './features/pendaftar';
import { adminReducer, pendaftarAdminReducer } from './features/admin';
import { staffReducer } from './features/staff';

const privateReducer = combineReducers({
   pendaftar: pendaftarReducer,
   admin: adminReducer,
   pendaftarAdmin: pendaftarAdminReducer,
   staff: staffReducer,
});

const publicReducer = combineReducers({
   auth: authReducer,
});

export const rootReducer = combineReducers({
   private: privateReducer,
   public: publicReducer,
});
