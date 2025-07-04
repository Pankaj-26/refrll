import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profileSlice';
import applicantReducer from '../features/applicantSlice';
import companyReducer from '../features/companySlice';
import userReducer from "../features/userSlice"

import jobReducer from '../features/jobSlice';
import themeReducer from '../features/theme/themeSlice';
import notificationsReducer from "../features/notificationsSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
     profile: profileReducer,
    user: userReducer,
    company: companyReducer,
    jobs: jobReducer,
    applicants: applicantReducer,
    theme: themeReducer,
     notifications: notificationsReducer
  },
});
