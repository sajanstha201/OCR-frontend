import { createSlice } from "@reduxjs/toolkit";

export const ProfileSlice=createSlice({
    name:'user_profile',
    initialState:{
        'username':'',
        'email':'',
        'first_name':'',
        'last_name':'',
        'token':'',
        'id':'',
        'photoSrc':'',
        'contact':'',
        'isLogin':false
    },
    reducers:{
        setIsLogin:(state,action)=>{
            state.isLogin=action.payload;
        },
        setUserInfo:(state,action)=>{
            const userInfo=action.payload
            state.username=userInfo.username;
            state.email=userInfo.email;
            state.first_name=userInfo.first_name;
            state.last_name=userInfo.last_name;
            state.id=userInfo.id;
            state.contact=userInfo.contact;
        },
        setToken:(state,action)=>{
            state.token='Token '+action.payload
        },
        setPhotoSrc:(state,action)=>{
            state.photoSrc=action.payload
        }
    }
})
export default ProfileSlice.reducer;
export const {setIsLogin,setUserInfo,setToken,setPhotoSrc}=ProfileSlice.actions
