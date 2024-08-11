import InputUpload from "./InputUpload";
import UploadedFiles from './UploadedFiles'
import AddFiles from './AddFiles'
import './Upload.css'
import { useSelector } from "react-redux";
import axios from "axios";
function Upload({featureName,files,setFiles}){

    return(
        <> 
        {(files.inputFiles.length===0)&&<InputUpload featureName={featureName} files={files} setFiles={setFiles}></InputUpload>}
        {(files.inputFiles.length!==0)&&<UploadedFiles files={files} setFiles={setFiles} featureName={featureName}></UploadedFiles>}
        </>
    )
}
export default Upload;