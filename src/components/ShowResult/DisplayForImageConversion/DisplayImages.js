import { useImageConversionFile } from "../../../context/AppProvider";
import { InstanceImage } from "./InstanceImage";
export const DispalyImages=()=>{
    const {imageConversionFile:files,setImageConversionFile:setFiles}=useImageConversionFile();
    return(
        <>
        <div className="flex w-full h-[60vh] items-center justify-center ">
            <div className="flex flex-wrap  w-[60%]  h-full border bordr-black overflow-auto relative p-3 shadow-sm bg-gray-100 rounded-md">
                <div onClick={()=>{setFiles({'inputFiles':[],'result':[]})}} className="absolute w-[25px] h-[25px] right-2 top-2 bg-red-600 rounded-full flex items-start justify-center">x</div>
                {files.result.map((value,index)=>(<InstanceImage index={index} imageData={value}/>))}
            </div>
        </div>
        </>
    )
}