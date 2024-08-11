import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye,faDownload,faBackward } from "@fortawesome/free-solid-svg-icons"
export const ShowDownloadView=({featureName,downloadData,setFiles,ViewFunction,DownloadFunction,downloadName})=>{
    return(
        <div id='table-extraction-submit-button' className='pdf-conversion-submit-button w-full flex flex-col gap-5 m-5 h-[60vh]'>
        <div className="w-[100px] h-[100px] rounded-full p-6 pr-8 flex items-center justify-center">
        <FontAwesomeIcon icon={faBackward} size='4x' className='text-blue-500' 
        onClick={()=>setFiles(prevData=>({...prevData,result:[]}))}>

        </FontAwesomeIcon>
        </div>
        <div className='flex items-center justify-center h-[15%] w-[30%] border text-[35px] cursor-pointer hover:h-[16%] hover:w-[31%]  font-bold text-white bg-blue-500 shadow-lg rounded-full transition duration-300 ease-in-out' 
            onClick={ViewFunction}>
            View 
            <FontAwesomeIcon icon={faEye} className='pl-4'/>
        </div>
        <div  className='flex items-center justify-center h-[15%] w-[30%] border text-[35px] cursor-pointer hover:h-[16%] hover:w-[31%]  font-bold text-white bg-blue-500 shadow-lg rounded-full transition duration-300 ease-in-out' 
            onClick={()=>{DownloadFunction(downloadData,downloadName)}}>
            Download
            <FontAwesomeIcon icon={faDownload}className='pl-4'/>
        </div>
    </div>
    )
}