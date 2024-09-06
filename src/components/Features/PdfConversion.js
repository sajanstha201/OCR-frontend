import './PdfConversion.css';
import { createElement, useState } from 'react';
import Upload from '../FileUploading/Upload';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { showAlert, activate_loader } from '../AlertLoader/index';
import { usePdfConversionFile } from '../../context/AppProvider';
import { Button } from 'react-bootstrap';
import { DownloadPDF } from '../DownloadFile';
import { ShowDownloadView } from './ShowDownloadView';
export function PdfConversion() {
    const {pdfConversionFile: files,setPdfConversionFile:setFiles}=usePdfConversionFile()
    //const [files,setFiles]=useState({inputFiles:[],result:'asfsld'})
    const [resultDetail, setResultDetail] = useState(null);
    const userProfile = useSelector((state) => state.userProfile);
    const baseUrl = useSelector((state) => state.baseUrl.backend);
    const frontendBaseUrl=useSelector((state)=>state.baseUrl.frontend)
    const convertToPdf = async () => {
        activate_loader(true);
        const imageFormData = new FormData();
        files.inputFiles.forEach(file => imageFormData.append('images', file));
        try {
            console.log(userProfile)
            if(userProfile.isLogin){
                const response = await axios.post(baseUrl + 'api/scanned-files/', imageFormData, {
                    headers: { 'Authorization': userProfile.token }
                });
                console.log(response.data)
                setResultDetail(response.data);
                setFiles(prevData=>({...prevData,name:response.data.file.split('/').pop()}))
                const pdfResponse = await axios.get(baseUrl + response.data.file.substring(1) + '/', {
                    headers: { 'Authorization': userProfile.token },
                });
                setFiles(prevData=>({...prevData,result:[pdfResponse.data]}))
            }
            else{
                const response=await axios.post(baseUrl+'api/guest-scanned-files/',imageFormData)
                setResultDetail(response.data);
                const pdfResponse = await axios.get(baseUrl + response.data.file.substring(1) + '/',);
                setFiles(prevData=>({...prevData,result:[pdfResponse.data]}))
            }


        } catch (error) {
            console.log(error)
            showAlert(error.message || error, 'red');
        } finally {
            activate_loader(false);
        }
    };
    const ViewPDF=()=>{
        try{
            const newWin=window.open(frontendBaseUrl+'blank')
            const pdfBlob = new Blob([files.result[0]], { type: 'application/pdf' });
            if(pdfBlob){
                const urlObject = URL.createObjectURL(pdfBlob);
                newWin.location.href=`${frontendBaseUrl}#/display-pdf?file=${encodeURIComponent(urlObject)}`
                newWin.focus();
            }
            else{
                showAlert('Empty Pdf', 'red');
            }
        }
        catch(error){
            showAlert(error,'red');
        }
    }
    
    return (
        <div>
            <h1 className='mt-4 text-xxl text-bold'>Image to Pdf</h1>
            {files.result.length===0&&<Upload featureName={'pdf-conversion'} files={files} setFiles={setFiles}></Upload>}
            {files.inputFiles.length!==0&&
                    <>
                    {files.result.length===0?   
                    <Button onClick={convertToPdf} size='lg' variant='success' className=' flex items-center justify-center' style={{width:'150px'}}>Convert</Button>
                    :
                    <ShowDownloadView 
                    featureName={'documentAnalysis'}  
                    setFiles={setFiles} 
                    downloadName={files.name}
                    DownloadFunction={DownloadPDF} 
                    ViewFunction={ViewPDF}
                    downloadData={new Blob([files.result[0]], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })}
                    />}
                    </>
            }

        </div>
    );
}
