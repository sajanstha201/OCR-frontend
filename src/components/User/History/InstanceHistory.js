import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload, faBeer, faCoffee, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { showAlert } from "../../AlertLoader"
import { faGofore } from "@fortawesome/free-brands-svg-icons"
import { useImageConversionFile } from "../../../context/AppProvider"
import { Navigate } from "react-router-dom"

export const InstanceHistory=({featureName,instanceHistoryData,deleteInstance,downloadFile})=>{
    const {imageConversionFile,setImageConversionFile}=useImageConversionFile()
    const userInfo=useSelector((state)=>state.userProfile)
    const [imageUrl,setImageUrl]=useState('')
    const baseUrl=useSelector((state)=>state.baseUrl).backend
    const [goToICActivate,setGoToICActivate]=useState(false)
    const [count,setCount]=useState(0)
    useEffect(() => {
        const fetchImage = async () => {
          try {
              var imageUrl=null;
              switch(featureName){
                case 'pdfConversion':
                    imageUrl=instanceHistoryData.pages[0].image;
                    break;
                case 'tableExtraction':
                    imageUrl=instanceHistoryData.image;
                    break;
                case 'documentAnalysis':
                    imageUrl=instanceHistoryData.image;
                    break;
                case 'imageConversion':
                    imageUrl=baseUrl+instanceHistoryData.pages[0].image.substr(1)
                    break;
                default:
                  imageUrl=null;
              }
              const response = await axios.get(imageUrl, {
                headers: {
                  'Authorization': 'Token ' + localStorage.getItem('token')
                },
                responseType: 'arraybuffer'
              });
              const blob = new Blob([response.data], { type: 'image/png' });
              const objectUrl = URL.createObjectURL(blob);
              setImageUrl(objectUrl);
          } 
          catch (error) {
            showAlert(error,'red')
            console.error('Error fetching image:', error);
          }
        };
    
        fetchImage();
      }, [instanceHistoryData.pages]);
    if(goToICActivate){
      return(<Navigate to="/image-conversion" />)
    }
    const deleteHistory=async ()=>{
      try{
        let url=''
        if(featureName==='pdfConversion'){
          url='api/scanned-files/'
        }
        else if(featureName==='tableExtraction'){
          url='api/images/'
        }
        else if(featureName==='documentAnalysis'){
          url='api/convert-doc/'
        }
        else if(featureName==='imageConversion'){
          url='api/files/'
        }
        const response=await axios.delete(baseUrl+url+instanceHistoryData.id,{
          headers:{
            'Authorization':userInfo.token
          }
        })
        showAlert('Deleted '+instanceHistoryData.file.split('/').pop(),'red')
        deleteInstance(instanceHistoryData)
      }
      catch(error){
        showAlert(error,'red')
        console.log(error)
      }
    }
    const goToImageConversion=()=>{
      try{
        setImageConversionFile(prevData=>({...prevData,result:[...instanceHistoryData.pages]}))
        setGoToICActivate(true)
      }
      catch(error){
        showAlert(error,'red')
        console.log(error)
      }

    }
    return(
        <div className={`border bg-[white] hover:bg-gray-100 h-20 w-full flex  items-center jusitfy-center  relative cursor-pointer`}>
            <div className="absolute left-2 h-full w-10  flex  items-center jusitfy-center ">
                <img src={imageUrl} alt={instanceHistoryData.id}>
                </img>
            </div>
            <div className="absolute left-16 w-[200px] overflow-hidden">
                {featureName!=='tableExtraction'&&instanceHistoryData.file.split('/').pop()}
                {featureName==='tableExtraction'&&userInfo.username+instanceHistoryData.created+'.xslx'}
            </div>
            <div className="absolute left-[50%]  w-[200px] overflow-hidden sm:hidden lg:flex">
                {instanceHistoryData.created}
            </div>  
            <div className="absolute left-[85%] ">
              <FontAwesomeIcon icon={faTrash} onClick={deleteHistory} className="h-[80%] w-[20px] hover:h-[90%] hover:w-[22px]"/>
            </div>
            <div className="absolute left-[95%] ">
            {
            featureName==='imageConversion'?
            <FontAwesomeIcon icon={faGofore} onClick={goToImageConversion}/>:
            <FontAwesomeIcon icon={faDownload} onClick={()=>{downloadFile(instanceHistoryData)}} className="h-[80%] w-[20px] hover:h-[90%] hover:w-[22px]"/>
            }
            </div>
        </div>
    )
}