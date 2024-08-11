import { Button } from "react-bootstrap"
import { showAlert } from "../../AlertLoader";
import axios from "axios";
import { useSelector } from "react-redux";

export const PasswordAndSecurity=()=>{
    const baseUrl=useSelector((state)=>state.baseUrl).backend
    const userInfo=useSelector((state)=>state.userProfile)
    const submitChangePassword=async ()=>{
        try{
            console.log('chaning the password by the user')
            const oldPassword=document.getElementById('oldPassword').value;
            const newPassword=document.getElementById('newPassword').value;
            const confirmPassword=document.getElementById('confirmPassword').value;
            if(newPassword===confirmPassword){
                const response=await axios.post(baseUrl+'api/users/'+userInfo.id+'/reset-password/',
                    {'old_password':oldPassword,
                    'new_password':newPassword
                    },{headers:{'Authorization':userInfo.token}})
                showAlert('Successfully Changed the password','green')
                document.getElementById('oldPassword').value='';
                document.getElementById('newPassword').value='';
                document.getElementById('confirmPassword').value='';
            }
            else{
                showAlert('Password MisMatch','red')
            }
        }
        catch(error){
            console.log('Error in Password and Security:',error);
            showAlert(error.response.data.error,'red')
        }
    }
    return(
        <div className="flex justify-center w-full bg-gray-100 p-10">
        <div className=" ">
      <div className="p-10 flex items-start flex-col gap-3 bg-white rounded-xl">
            <h2>Change Password</h2>
            <div className="flex items-start flex-col">
                <label>Old Password</label>
                <input type='password' id='oldPassword' className="border border-black w-[250px] h-10 rounded-sm"></input>
            </div>
            <div className="flex items-start flex-col">
                <label>New Password</label>
                <input type='password' id='newPassword' className="border border-black w-[250px] h-10 rounded-sm"></input>
            </div>
            <div className="flex items-start flex-col">
                <label>Confirm Password</label>
                <input type='password' id='confirmPassword' className="border border-black w-[250px] h-10 rounded-sm"></input>
            </div>
            <div>
                <Button onClick={submitChangePassword}>Update</Button>
            </div>
        </div>
        </div>

        </div>
 
    )
}