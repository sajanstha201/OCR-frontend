import axios from "axios";
import { useImageConversionFile } from "../../context/AppProvider"
import { activate_loader, showAlert } from "../AlertLoader";
import Upload from "../FileUploading/Upload"
import { Button } from "react-bootstrap";
import { Dropdown,DropdownButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DispalyImages } from "../ShowResult/DisplayForImageConversion/DisplayImages";
export const ImageConversion=()=>{
    const {imageConversionFile:files,setImageConversionFile:setFiles}=useImageConversionFile();
    const baseUrl=useSelector((state)=>state.baseUrl).backend
    const userInfo=useSelector((state)=>state.userProfile)
    const convertToImage=async ()=>{
        try{
            activate_loader(true)
            const pdfFile=new FormData();
            pdfFile.append('file',files.inputFiles[0])
            const response=await axios.post(baseUrl+'api/files/',pdfFile,{
                headers:{
                    'Authorization':userInfo.token
                }
            })
            console.log(response.data)
            setFiles(prevData=>({...prevData,result:[...response.data.file.pages]}))
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
        <h1 className='mt-4 text-xxl text-bold'>Pdf to Image</h1>
        {files.result.length===0?<>
            <Upload featureName={'imageConversion'} files={files} setFiles={setFiles}></Upload>
            <Button variant="success" size='lg' className="mt-4" onClick={convertToImage}>Convert</Button>
        </>:<>
        <DispalyImages/>
        </>}
        </>
    )
}