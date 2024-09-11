import { useEffect } from 'react'
import './InputUpload.css'
function InputUpload({featureName,setFiles,files}){
    const changeInput=()=>{
        setFiles(prevFiles=>({...prevFiles,inputFiles:[...prevFiles.inputFiles,...document.getElementById(featureName+'-upload-input-files').files]}))
    }
    return(
        <>
            <div id={featureName+"-upload-outer-container"} className='upload-outer-container'>
                {featureName==='imageConversion'?(<>
                    <label htmlFor={featureName+"-upload-input-files"} id={featureName+"-upload-container"} className='upload-container'>
                    <p>Upload PDF</p> </label>
                    <input type="file" id={featureName+"-upload-input-files"} accept=".pdf" className='upload-input-files' multiple onChange={changeInput}></input>
                </>):
                (<>
                <label htmlFor={featureName+"-upload-input-files"} id={featureName+"-upload-container"} className='upload-container'>
                    <p>Upload Images</p> </label>
                    {featureName=='pdf-conversion'?
                    (<input type="file" id={featureName+"-upload-input-files"} accept=".png,.jpeg,.jpg" className='upload-input-files' multiple onChange={changeInput}></input>):
                    (<input type="file" id={featureName+"-upload-input-files"} accept=".png,.jpeg,.jpg" className='upload-input-files'  onChange={changeInput}></input>)}
                </>)}

            </div>
        </>
    )
}
export default InputUpload