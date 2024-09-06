import './TableExtraction.css'
import Upload from '../FileUploading/Upload'
import { useState } from 'react'
import { useTableExtractionFile } from '../../context/AppProvider'
import { activate_loader, showAlert } from '../AlertLoader'
import axios from 'axios'
import { connect, useSelector } from 'react-redux'
import * as XLSX from 'xlsx';
import ReactDOM from 'react-dom';
import { NewLoader } from '../AlertLoader/NewLoader'
import { Button } from 'react-bootstrap'
import { file } from 'jszip'
import { DownloadExcel } from '../DownloadFile'
import { ViewExcel } from '../ViewFileButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faEye,faBackward } from '@fortawesome/free-solid-svg-icons'
import { ShowDownloadView } from './ShowDownloadView'
export function TableExtraction(){
    const {tableExtractionFile:files,setTableExtractionFile:setFiles}=useTableExtractionFile()
    const userInfo=useSelector((state)=>state.userProfile)
    const baseUrl=useSelector((state)=>state.baseUrl.backend)
    const frontendBaseUrl=useSelector((state)=>state.baseUrl.frontend)
    const tableExtraction=async ()=>{
        try{
            activate_loader(true);
            const imageFormData = new FormData();
            files.inputFiles.forEach(file => imageFormData.append('image', file));
            const response=await axios.post(baseUrl+'api/images/',imageFormData,{headers:{ 'Authorization': userInfo.token }})
            setFiles(prevData=>({...prevData,name:userInfo.username+response.data.images.created+'.xlsx'}))
            setFiles(prevData=>({...prevData,result:[response.data.imagedata]}))
        }
        catch(error){
            console.log(error)
            try{
                showAlert(error.response.data.error,'red')
            }
            catch(e){
                showAlert(error,'red')
            }
        }
        finally{
            activate_loader(false)
        }
    }
    const viewTable = () => {
        try {
            const newWin = window.open(frontendBaseUrl + 'blank');
            const jsonBlob = new Blob([JSON.stringify(files.result[0])], { type: 'application/json' });
            if (jsonBlob) {
                const urlObject = URL.createObjectURL(jsonBlob);
                newWin.location.href = `${frontendBaseUrl}#/display-excel?file=${encodeURIComponent(urlObject)}&fileName=${encodeURIComponent(files.name)}`
                newWin.focus();
            }
        } catch (error) {
            showAlert(error, 'red');
            console.log(error);
        }
    };
    return(
        <>
         <h1 className='mt-4 text-xxl text-bold'>Table extraction</h1>
        {files.result.length===0&&<Upload featureName={'table-extraction'} files={files} setFiles={setFiles}></Upload>}
       {files.inputFiles.length!==0&&
        <>
            {files.result.length===0?
            <Button variant='success' size='lg' onClick={tableExtraction} className='flex items-center justify-center' style={{width:'150px'}}> Extract Table</Button>
            :<ShowDownloadView 
            featureName={'tableExtraction'} 
            downloadData={files.result[0]} 
            setFiles={setFiles} 
            ViewFunction={viewTable} 
            DownloadFunction={DownloadExcel} 
            downloadName={files.name}/>}
        </>}
        </>
    )
}