import { createSlice } from "@reduxjs/toolkit";

export const baseUrlSlice=createSlice({
    name:'base_url',
    initialState:{
        // 'backend':'http://192.168.1.140:8000/',
        // 'backend':'http://192.168.1.65:8000/',
        'backend':'http://127.0.0.1:8000/',
        'frontend':'http://localhost:3000/'
    },
    reducers:{
    }
})
export default baseUrlSlice.reducer