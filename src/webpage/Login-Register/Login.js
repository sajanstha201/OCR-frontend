import { useState } from 'react';
import './Login.css'
import { Link ,Navigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {activate_loader,showAlert} from '../../components/AlertLoader/index'
import { setIsLogin ,setPhotoSrc,setToken,setUserInfo} from '../../state/UserInformation/ProfileSlice';
export function Login(){
    const user_profile=useSelector((state)=>state.userProfile)
    const dispatch=useDispatch()
    const base_url=useSelector((state)=>state.baseUrl.backend)
    const [userLoginInfo,setuserLoginInfo]=useState({'username':'','password':''})
    const baseUrl=useSelector((state)=>state.baseUrl).backend
    if(user_profile.isLogin){
        activate_loader(false);
        showAlert('Successfully login','green')
        return <Navigate to='/'></Navigate>
    }
    const handleChange=(event)=>{
        setuserLoginInfo({...userLoginInfo,[event.target.name]:event.target.value})
    }
    const submitForm=async(e)=>{
        e.preventDefault()
        activate_loader(true)
        try{
        const response=await axios.get(base_url+'api/get-csrf-token/')
        const csrf_token=response.data.csrf_token
        const response2=await axios.post(base_url+'api/login/',userLoginInfo)
        dispatch(setUserInfo(response2.data))
        dispatch(setToken(response2.data.token))
        dispatch(setIsLogin(true))
        if(response2.data.photo){
            const imageResponse=await axios.get(baseUrl+response2.data.photo.substr(1),{responseType: 'arraybuffer'})
            dispatch(setPhotoSrc(URL.createObjectURL(new Blob([imageResponse.data], { type: 'image/png' }))));
        }
        localStorage.setItem('token',response2.data.token)
        }
        catch(error){
            console.log(error)
            try{
                showAlert(error.response.data.non_field_errors,'red')
            }
            catch(e){
                try{
                    showAlert(error.response.data.error,'red')
                }
                catch(e1){
                    console.log(e1)
                    showAlert('unable to login','red')
                }
                
            }
            console.log(error)
        }
        finally{
            activate_loader(false)
        }
    }
    return(
        <div className="login-container">
            <form className="login-form"  onSubmit={submitForm}>
                <h2>Login</h2>
                <label htmlFor="email">Username</label>
                <input id='username' name='username' type='text' onChange={handleChange} required></input>
                <label htmlFor="password">Password</label>
                <input id='password' name='password' type='password' onChange={handleChange}required></input>
                <button type='submit'>Login</button>
                <Link to='/register' style={{marginTop:'20px'}}>Don't have an account?</Link>
                <Link to='/anti-nav/otp'>Forgot Password?</Link>
            </form>
        </div>

    );
}