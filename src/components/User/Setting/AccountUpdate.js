import { faCircle,faL,faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { activate_loader, showAlert } from "../../AlertLoader"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo,setPhotoSrc, setToken, setIsLogin } from "../../../state/UserInformation/ProfileSlice"
export const AccountUpdate=()=>{
    const [isImageUploaded,setIsImageUploaded]=useState(false)
    const [userImage,setUserImage]=useState()
    const baseUrl=useSelector((state)=>state.baseUrl).backend
    const userInfo=useSelector((state)=>state.userProfile)
    const dispatch=useDispatch()
    const checkImageUpload=()=>{
        const imageFiles=document.getElementById('user-pic-update').files;
        if(imageFiles.length!==0){
            setIsImageUploaded(true);
            setUserImage(URL.createObjectURL(new Blob([imageFiles[0]])))
        }
        else{
            setIsImageUploaded(false)
        }
    }
    const updateImage=async()=>{
        try{
            activate_loader(true);
            const inputImage=document.getElementById('user-pic-update').files[0];
            const imageFormData=new FormData();
            imageFormData.append('photo',inputImage);
            const response=await axios.patch(baseUrl+'api/users/'+userInfo.id+'/',imageFormData,{headers:{'Authorization':userInfo.token}})
            console.log('image updation response',response.data)
            const imageResponse=await axios.get(response.data.photo,{responseType: 'arraybuffer'})
            console.log('image response',imageResponse.data)
            dispatch(setPhotoSrc(URL.createObjectURL(new Blob([imageResponse.data], { type: 'image/png' }))));
            showAlert('successfully changed the photo','green')
        }
        catch(error){
            console.log(error)
            showAlert(error,'red')
        }
        finally{
            activate_loader(false)
        }
    }

    const updateData=async(e)=>{
        try{
            activate_loader(true);
            const response=await axios.patch(baseUrl+'api/users/'+userInfo.id+'/',{
                [e.target.previousSibling.id]:e.target.previousSibling.value
            },{headers:{'Authorization':userInfo.token}})
            dispatch(setUserInfo(response.data))
            dispatch(setToken(localStorage.getItem('token')))
            dispatch(setIsLogin(true))
            document.getElementById(e.target.previousSibling.id).value=''
        }
        catch(error){
            console.log(error)
            showAlert(error,'red')
        }
        finally{
            activate_loader(false)
        }

    }
    return(
        <>
        <div className="w-full  bg-gray-100 flex flex-col md:flex-row lg:flex-row  justify-center gap-7 p-10 ">
          <div className=" w-full lg:w-3/5 h-7/5 flex flex-col gap-4  ">
               <div className="w-full bg-white flex flex-wrap justify-between gap-5 py-3 px-10 items-center rounded-md">
                  <div className="flex items-center gap-7 flex-wrap">
                    <div className={`${!isImageUploaded?'':'hidden'} flex items-center gap-7 `}>
                        <label htmlFor='user-pic-update' style={{fontSize: '2em' }} className="flex items-center justify-center w-20 h-20 border border-black border-dotted rounded-full">
                            <FontAwesomeIcon icon={faCircle} style={{ color: 'lightgray', position: 'absolute', width: '2em', height: '2em' }} />
                            <FontAwesomeIcon icon={faPlus} style={{ position: 'absolute', width: '1em', height: '1em' }} />
                        </label>
                        <input type='file' accept='.png,.jpeg,.jpg' className="hidden" id='user-pic-update' onChange={checkImageUpload}></input> 
                        <label>Upload your profile picture</label>
                    </div>
                    <div className={`${isImageUploaded?'':'hidden'} flex items-center justify-center gap-7 `} id='user-uploaded-pic'>
                        <img className="w-20 h-20  border border-black  rounded-full" src={userImage} alt="user uploaded image">
                        </img>
                        <label>Image Uploaded</label>
                        <Button variant="danger" onClick={()=>{setIsImageUploaded(false)}}>Remove</Button>
                    </div>
                  </div>
                  <Button onClick={updateImage}>Update</Button>
               </div> 
                  <div className="w-full bg-white rounded-md flex  flex-col p-9 justify-center  gap-8">
                     <h1  className="text-xl font-bold flex justify-center">Account Update</h1>
                     <div className="flex flex-col gap-3">
                        <div className="w-[80%] flex sm:flex-col lg:flex-row md:flex-col gap-3">
                                <label className="font-semibold text-lg text-zinc-900 flex justify-start w-60" >First Name</label>
                                <input  className=" h-10 px-4 w-full flex items-start items-center text-zinc-700 font-mono border border-black    w-full   rounded-sm"  id='first_name'></input>
                                <Button onClick={updateData}>Update</Button>
                            </div>
                            <div className="w-[80%] sm:flex-col lg:flex-row md:flex-col flex gap-3">
                                <label className="font-semibold text-lg text-zinc-900 flex justify-start w-60" >last Name</label>
                                <input className=" h-10 px-4 w-full text-zinc-700 flex items-start items-center font-mono border border-black  w-full   rounded-sm" id='last_name' ></input>
                                <Button onClick={updateData}>Update</Button>
                            </div>
                            {/**
                             * 
                             *  <div className="w-[80%] sm:flex-col lg:flex-row md:flex-col flex gap-3">
                                <label className="font-semibold text-lg text-zinc-900 flex justify-start w-60" >Email</label>
                                <input  className=" h-10 w-full px-4 flex items-start items-center text-zinc-700 font-mono border border-black    w-full   rounded-sm"  id='email'></input>
                                <Button onClick={updateData}>Update</Button>
                            </div>
                            */}
   
                            <div className="w-[80%] sm:flex-col  lg:flex-row md:flex-col flex gap-3">
                            <label className="font-semibold text-lg text-zinc-900 flex justify-start w-60" >Phone Number</label>
                            <input className=" h-10 w-full px-4 text-zinc-700 flex items-start items-center font-mono border border-black  w-full   rounded-sm" id='contact' ></input>
                            <Button onClick={updateData}>Update</Button>
                        </div>
                         </div >
                               
                  </div>
               <div>

               </div>

          </div>  
               
        </div>
     </>
    )

}