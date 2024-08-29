import '../Login-Register/Register.css'
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import closed_eye from '../../static/images/closed-eye.png'
import open_eye from '../../static/images/open-eye.png'
import { useSelector } from 'react-redux';
import {activate_loader,showAlert} from '../../components/AlertLoader/index'
export function Register(){
    const base_url=useSelector((state)=>state.baseUrl.backend)
    const [userInfo,setUserInfo]=useState({'first_name':'','last_name':'','email':'','username':'','password':''})
    var [eyeStatus,setEyeStatus]=useState(true)
    const [isRegistered,setIsRegistered]=useState(false)
    if(isRegistered){
        return <Navigate to='/login'></Navigate>
    }
    const handleChange=(event)=>{
        setUserInfo({...userInfo,[event.target.name]:event.target.value})
    }
    const isPasswordValid=(pass1,pass2)=>{
        if(pass1!==pass2){
            showAlert('Password dont match','red');
            return false;
        }
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        // if(!regex.test(pass1)){
        //     showAlert('password should have 1 special char, 1 upper char, 1 lower char and 1 digit','red')
        //     return false;
        // }
        return true;
    }
    const change_eyeStatus=()=>{
        if(eyeStatus){
            document.getElementById('eye-img').src=open_eye;
            document.getElementById('password').type='text';
        }
        else{
            document.getElementById('eye-img').src=closed_eye
            document.getElementById('password').type='password';;
        }
        setEyeStatus(!eyeStatus);
    }
    const submitForm=async(event)=>{
        try{
            event.preventDefault()
            if(!isPasswordValid(document.getElementById('password').value,document.getElementById('confirm-password').value)){
                return false;
            }
            activate_loader(true)
            let csrf_token
            const response =await axios.get(base_url+'api/get-csrf-token/')
            csrf_token=response.data.csrf_token
            const response2=axios.post(base_url+'api/users/',userInfo,{headers:{'X-CSRFToken': csrf_token}})
            showAlert('SuccessFully Registered. Go to your email for verification','green')
            setIsRegistered(true)
        }
        catch(error){
            try{
                const error_dict=error.response.data
                if('username' in error_dict && 'email' in error_dict) showAlert(error.response.data['username']+' and '+error.response.data['email'],'red')
                else if('username' in error_dict) showAlert(error_dict['username'],'red')
                else showAlert(error_dict['email'],'red')
            }
            catch(error){
                showAlert('something went wrong','red')
            }

        }
        finally{
            activate_loader(false)
        }
    }
    return(
        <div className="form-container">
        <form id='registration-from' className="registration-form" onSubmit={submitForm} >
            <h1>Registration Form</h1>
            <label htmlFor="firstname">First Name</label>
            <input id="firstname" name="first_name" type="text" onChange={handleChange} required></input>
            
            <label htmlFor="secondname">Second Name</label>
            <input id="secondname" name="last_name" type="text" onChange={handleChange} required></input>
            
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" onChange={handleChange} required></input>
            <label></label>
            
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" onChange={handleChange} required></input>

            <label htmlFor="password" className='password'>Password<img alt='eye' id='eye-img' src={closed_eye} onClick={change_eyeStatus}></img></label>
            <input id="password" name="password" type="password" onChange={handleChange} required></input>

            <label htmlFor="confirm-password" className='confirm-password'>Confirm Password</label>
            <input id="confirm-password" name="confirm-password" type="password" required></input>

            <button type="submit">Submit</button>
            <Link to='/login' style={{marginTop:'20px'}}>Already have an account?</Link>
        </form>
    </div>
    );
}