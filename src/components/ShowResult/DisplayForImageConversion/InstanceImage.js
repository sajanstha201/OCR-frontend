import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown,DropdownButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import { showAlert } from "../../AlertLoader";
import { Link } from "react-router-dom";
import { activate_loader } from "../../AlertLoader";
import { useDocumentAnalysisFile, useTableExtractionFile } from "../../../context/AppProvider";
import { faL } from "@fortawesome/free-solid-svg-icons";
export const InstanceImage=({index,imageData})=>{
    const baseUrl=useSelector((state)=>state.baseUrl).backend
    const userInfo=useSelector((state)=>state.userProfile)
    const [imageUrl,setImageUrl]=useState('')
    const [imageBlob,setImageBlob]=useState('')
    const {tableExtractionFile,setTableExtractionFile}=useTableExtractionFile()
    const {documentAnalysisFile,setDocumentAnalysisFile}=useDocumentAnalysisFile()
    useEffect(()=>{
        try{
            const getImage=async()=>{
                try{
                    const response=await axios.get(baseUrl+imageData.image.substr(1),{
                        headers:{
                            'Authorization':userInfo.token
                        },
                        responseType:'arraybuffer'
                    })
                    const responseBlob=new Blob([response.data],{type:'image/png'})
                    setImageBlob(responseBlob)
                    setImageUrl(URL.createObjectURL(responseBlob))
                }
                catch(error){
                    console.log(error)
                    showAlert(error,'red')
                }
            }
            getImage()
        }
        catch(error){
            console.log(error)
        }
    },[imageData])
    const goToTableExtraction=async ()=>{
        try{
            activate_loader(true);
            const file=new File([imageBlob],imageData.image.split('/').pop(),{
                type:'image/png',
     
            })
            const imageFormData = new FormData();
            imageFormData.append('image', file);
            setTableExtractionFile(prevData=>({...prevData,inputFiles:[file],result:[]}))
            const response=await axios.post(baseUrl+'api/images/table-from-pdf-page/',{id:imageData.id},{
                headers:{ 'Authorization': userInfo.token 
                }
                })
            console.log(response.data)
            console.log(response.data.images.image.split('/').pop())
            setTableExtractionFile(prevData=>({...prevData,name:userInfo.username+response.data.images.created+'.xlsx'}))
            console.log(response.data.imagedata)
            setTableExtractionFile(prevData=>({...prevData,result:[response.data.imagedata]}))
        }
        catch(error){
            showAlert(error.response.data.error,'red')
            console.log(error)
        }
        finally{
            activate_loader(false)
        }

    }


    const goToDocumentAnalysis=async ()=>{
        try{
            const file=new File([imageBlob],imageData.image.split('/').pop(),{
                type:'image/png',
               
            })
            setDocumentAnalysisFile(prevData=>({...prevData,inputFiles:[file],result:[]}))
            activate_loader(true)
            const imageFormData=new FormData();
            imageFormData.append('image',file)
            const urlResponse = await axios.post(baseUrl + 'api/convert-doc/word-from-pdf-page/',{id:imageData.id}, {
                headers: {
                    'Authorization': userInfo.token,
                },
            });
            console.log(urlResponse.data)
            setDocumentAnalysisFile(prevData=>({...prevData,name:urlResponse.data.file.split('/').pop()}))
            setDocumentAnalysisFile(prevFile=>({...prevFile,result:[urlResponse.data]}))
        }
        catch(error){
            console.log(error)
            showAlert(error,'red')
        }
        finally{
            activate_loader(false)
        }
    }
    return(
        <>
        <div image_key={imageData.id} className=" w-[140px] h-[200px] bg-white border border-black relative rounded-md m-2">
            <div className="absolute left-0 bg-blue-500 text-white rounded-md h-[31px] w-[26.4px]">
                {index+1}
            </div>
            <img src={imageUrl} alt={imageData} className="rounded-xl"></img>
            <div className="absolute right-0 top-0">
                <DropdownButton id="dropdown-basic-button" className=" flex items-center justify-center rounded-lg" size='sm'>
                <Dropdown.Item  as={Link} to='/table-extraction' onClick={goToTableExtraction}>Table Extraction</Dropdown.Item>
                <Dropdown.Item as={Link} to='/document-analysis' onClick={goToDocumentAnalysis} >Document Analysis</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>
        </>
    )
}