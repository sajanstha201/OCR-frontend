import { configureStore } from "@reduxjs/toolkit";
import baseUrlReducer from './baseUrlSlice'
import userProfileReducer from './UserInformation/ProfileSlice'
export const store=configureStore({
    reducer:{
       baseUrl:baseUrlReducer,
       userProfile:userProfileReducer,
    }
})