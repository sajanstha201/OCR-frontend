import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus ,faCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { showAlert } from "../../AlertLoader";
export const Suggestion=()=>{
    const [suggestionImage,setSuggestionImage]=useState([])
    const [suggestionDescription,setsuggestionDescription]=useState('')
    const baseUrl=useSelector((state)=>state.baseUrl).backend
    const userInfo=useSelector((state)=>state.userProfile)
    const submitReport=async ()=>{
        try{
            const imageDataForm=new FormData();
            suggestionImage.forEach((value)=>imageDataForm.append('images',value));
            const response=await axios.post(baseUrl+'api/bug-report/',{
                'user':userInfo.id,
                'images':imageDataForm,
                'description':suggestionDescription
            },{
                headers:{
                    'Authorization':userInfo.token
                }
            })
            console.log(response)
            showAlert("Bug Reprot have been successfully saved.",'green')
            setSuggestionImage([]);
            document.getElementById('message').value='';
        }  
        catch(error){
            console.log(error)
            showAlert(error,'red')
        }
    }
    return(
        <>
    <div id="Suggestions " className="mt-7 flex flex-col p-5 gap-2" >
        <textarea placeholder="Any suggestion for us?" className="h-56 p-3 rounded-lg border" required></textarea>
      
        <br/>
        <div className="flex w-full pl-10 h-[200px] bg-white rounded-xl">
            <div  className='flex flex-col items-center justify-center m-3 items-start '>
                <label htmlFor='report-image' style={{fontSize: '2em' }} className="flex items-center justify-center w-full h-[50%]">
                    <FontAwesomeIcon icon={faCircle} style={{ color: 'lightgray', position: 'absolute', width: '2em', height: '2em' }} />
                    <FontAwesomeIcon icon={faPlus} style={{ position: 'absolute', width: '1em', height: '1em' }} />
                </label>
                <input type='file' className="hidden"multiple id='report-image' accept=".png,.jpg,.jpeg" onChange={(e)=>{setSuggestionImage(prevData=>[...prevData,...e.target.files])}}></input> 
                <label>Upload Images</label>
            </div>
            <div className="flex flex-wrap overflow-auto">
                {suggestionImage.length!==0&&<>
                    {suggestionImage.map((img, index) => (
                        <div key={index} index={index} className="w-[80px] h-[100px] m-2 flex justify-center items-center overflow-hidden relative border border-black rounded-xl">
                        <img src={URL.createObjectURL(new Blob([img],{ type: 'image/png' }))} alt={`Report ${index}`} />
                        <div onClick={(e)=>{setSuggestionImage(prevData=>prevData.filter((value,index)=>(parseInt(index)!==parseInt(e.target.parentNode.getAttribute('index'))))
                            )}}
                             className="bg-red-500 absolute w-[12px] h-[12px] right-1 top-1 rounded-full"></div>
                        </div>
                    ))}
                </>}
            </div>
        </div>
        <br/>
         <div className="flex w-full justify-center ">
              <button className="px-7 py-2 bg-blue-900 text-white font-semibold rounded-md" onClick={submitReport}>Submit Report !</button>
         </div>
    </div>
        </>
    )
}