import { useContext, useState } from "react";
import Upload from "../FileUploading/Upload";
import { useDocumentAnalysisFile } from "../../context/AppProvider";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { activate_loader, showAlert } from "../AlertLoader";
import mammoth from "mammoth";
import { file } from "jszip";
import { DownloadDoc } from "../DownloadFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward,faDownload } from "@fortawesome/free-solid-svg-icons";
import { ShowDownloadView } from "./ShowDownloadView";
function DocumentAnalysis(){
    const baseUrl=useSelector((state)=>state.baseUrl.backend);
    const {documentAnalysisFile:files,setDocumentAnalysisFile:setFiles}=useDocumentAnalysisFile();
    const userInfo=useSelector((state)=>state.userProfile);
    const frontendBaseUrl=useSelector((state)=>state.baseUrl.frontend)
    const documentAnalysis=async ()=>{
        try{
            activate_loader(true)
            const imageData=new FormData();
            files.inputFiles.forEach((file)=>imageData.append('image',file))
            const urlResponse = await axios.post(baseUrl + 'api/convert-doc/', imageData, {
                headers: {
                    'Authorization': userInfo.token,
                },
            });
            setFiles(prevFile=>({...prevFile,name:urlResponse.data.file.split('/').pop()}))
            setFiles(prevFile=>({...prevFile,result:[urlResponse.data]}))
        }
        catch(error){
            console.log(error)
        }
        finally{
            activate_loader(false)
        }
    }
    const downloadDoc=async()=>{
        try{
            activate_loader(true)
            const response=await axios.get(baseUrl+files.result[0].document.substring(1),{
                responseType:'arraybuffer',
            })
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            DownloadDoc(blob,files.name)
        }
        catch(error){
            showAlert(error,'red')
            console.log(error)
        }
        finally{
            activate_loader(false)
        }

    }
    return(
        <>
            <h1 className='mt-4 text-xxl text-bold'>Document Analysis</h1>
            {files.result.length===0&&<Upload featureName={'document-analysis'} files={files} setFiles={setFiles}></Upload>}
            {(files.result.length===0&&files.inputFiles.length!==0)&&<Button variant="success" size='lg' onClick={documentAnalysis} className="mt-4">Analyze</Button>}
            {files.result.length!==0&&
            <>
                <div  className=' w-full flex flex-col gap-5 m-5 h-[60vh] items-center justify-center'>
                <div className="w-[100px] h-[100px] rounded-full p-6 pr-8 flex items-center justify-center">
                <FontAwesomeIcon icon={faBackward} size='4x' className='text-blue-500' 
                onClick={()=>setFiles(prevData=>({...prevData,result:[]}))}>

                </FontAwesomeIcon>
                </div>
                <div  className='flex items-center justify-center h-[15%] w-[30%] border text-[35px] cursor-pointer hover:h-[16%] hover:w-[31%]  font-bold text-white bg-blue-500 shadow-lg rounded-full transition duration-300 ease-in-out' 
                    onClick={downloadDoc}>
                    Download
                    <FontAwesomeIcon icon={faDownload}className='pl-4'/>
                </div>
            </div>
            </>
            }
        </>
    );
}

export default DocumentAnalysis