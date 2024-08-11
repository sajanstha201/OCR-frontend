import './UploadedFiles.css'
import AddFiles from './AddFiles';
function UploadedFiles({files,setFiles,featureName}){
    const deleteImage=(e)=>{
        const image=e.target.parentNode;
        const imageId=image.id.replace('-div','');
        if(featureName==='pdf-conversion') setFiles(prevFiles=>({...prevFiles,inputFiles:prevFiles.inputFiles.filter((_,index)=>index!==parseInt(imageId))}))
        else setFiles({inputFiles:[],result:[]})
        setFiles(prevData=>({...prevData,result:[]}))
    }
    const handleDrop=(e,newIndex)=>{
        e.preventDefault();
        const oldIndex = parseInt(e.dataTransfer.getData('index'));
        const newList=[...files.inputFiles]
        const [movedFile]=newList.splice(oldIndex,1);
        newList.splice(newIndex,0,movedFile)
        setFiles(prevFile=>({...prevFile,inputFiles:newList}))
    }
    const handleDragStart=(e,index)=>{
        e.dataTransfer.setData('index',index)
    }
    return (
        <>
        {files.inputFiles[0].name.endsWith('.pdf')?(<>
            <div className="h-[40vh] w-full flex items-center justify-center ">
            <div className="w-[30%] h-[50%] border border-black bg-blue-500 rounded-xl flex items-center justify-center relative ">
                {files.inputFiles[0].name}
                <div onClick={()=>{setFiles(prevFile=>({...prevFile,inputFiles:[]}))}}className="absolute bg-red-600 w-[15px] h-[15px] hover-scale right-2 top-2 rounded-full flex items-center justify-center">
            x
            </div>
            </div>

        </div>
            </>):
        (<><div id={featureName + 'uploaded-outer-container'} className='uploaded-outer-container'>
            <div className={featureName==='pdf-conversion'?'uploaded-inner-container':'uploaded-inner-container-table-extraction'}>
            {files.inputFiles.map((file, index) => (
                <div key={index+ '-div'} className={featureName==='pdf-conversion'?'uploaded-inner-image-container':'uploaded-inner-image-container-table-extraction'} id={index+ '-div'} 
                draggable
                onDragStart={(e)=>{handleDragStart(e,index)}}
                onDragOver={(e)=>{e.preventDefault()}}
                onDrop={(e)=>{handleDrop(e,index)}}> 
                {featureName==='pdf-conversion'&& <div className='indexing-div'>{index+1}</div>}  
                    <img src={URL.createObjectURL(file)} alt={`File ${index}`} />
                    <p>{file.name}</p>
                    <div className='cross-buttons' id={index+ '-cross-button'} onClick={deleteImage}></div>
                </div>
                ))}
                {featureName==='pdf-conversion'&&<AddFiles featureName={featureName} files={files} setFiles={setFiles}></AddFiles>}
            </div>
        </div>
         </>)}
         </>
    );
}
    export default UploadedFiles;