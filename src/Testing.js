import axios from "axios"
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux"
import { Dropdown,DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload ,faTrash, faDownload, faBackward} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export const Testing=()=>{
    const baseUrl=useSelector((state)=>state.baseUrl).backend
    const userInfo=useSelector((state)=>state.userProfile)
    const pdfTesting=async()=>{
        const response = await axios.get(baseUrl + 'api/scanned-files/',{
            headers: { 'Authorization': userInfo.token }
        });
        console.log(response.data)
    }
    const [inputFiles,setInputFiles]=useState()
    return(
        <>
        <div className="h-[30vh] w-full flex items-center justify-center">
            <label className="w-[20%] h-[50%] border border-black bg-blue-500 rounded-xl flex items-center justify-center ">
                <FontAwesomeIcon icon={faUpload} size='3x' className="hover-scale"></FontAwesomeIcon>
                <input type="file" accept=".pdf" className="hidden" id='file-name' onChange={(e)=>{setInputFiles(e.target.files[0].name)}}></input>
            </label>
        </div>

        <div className="h-[30vh] w-full flex items-center justify-center ">
            <div className="w-[20%] h-[50%] border border-black bg-blue-500 rounded-xl flex items-center justify-center relative ">
                {inputFiles}
                <div className="absolute bg-red-600 w-[15px] h-[15px] hover-scale right-2 top-2 rounded-full flex items-center justify-center" onClick={()=>{setInputFiles('')}}>
            x
            </div>
            </div>

        </div>


        <div>
        <div className="h-[30vh] w-full flex items-center justify-center">
            <div className=" w-[140px] h-[200px] bg-white border border-black relative rounded-md">
                <div className="absolute left-0 bg-blue-500 text-white rounded-md h-[31px] w-[26.4px]">
                    1
                </div>
                <div className="absolute right-0 ">
                    <DropdownButton id="dropdown-basic-button" className=" flex items-center justify-center rounded-lg" size='sm'>
                    <Dropdown.Item href="#/action-3">Pdf Conversion</Dropdown.Item>
                    <Dropdown.Item href="#/action-1">Table Extraction</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Document Analysis</Dropdown.Item>
                    </DropdownButton>
                </div>

            </div>
        </div>
        </div>
        <br>
        </br>
<h1>Image Conversion History</h1>
        <div className="w-full h-[100vh] flex justify-center">
        <div className="bg-gray-200 w-[80%] rounded-md flex flex-col items-start mt-2 shadow-md">
        <div className={`bg-gray-300  w-full h-[50px] relative items-center justify-between flex shadow-lg`}>
            <div className="absolute left-[10%]">
                Name
            </div>
            <div className="absolute left-[60%] sm:hidden lg:flex">
                Date
            </div>  
        </div>
        <div  className="flex-wrap flex-col w-full">
            <div className="bg-[white] hover:bg-gray-100 font-bold border-b h-10 w-full flex items-center justify-center cursor-pointer " >
                ...
            </div>
           </div>
            </div>
        </div>

        <div className="flex flex-col justify-center items-center h-[100vh] bg-gray-100 w-full">
            <div className="bg-gray-500 w-[100px] h-[100px] rounded-full p-6 pr-8 flex items-center justify-center">
                <FontAwesomeIcon icon={faBackward} size='4x'></FontAwesomeIcon>
            </div>
            <div className="bg-blue-500 w-[20%] h-[10%] m-2 rounded-full flex items-center justify-center text-[30px] gap-3 cursor-pointer">
                Download
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
            </div>
            <div className="bg-blue-500 w-[30%] h-[20%] m-2">

            </div>
        </div>
        </>
    )
}