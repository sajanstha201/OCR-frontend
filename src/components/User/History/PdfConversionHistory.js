
import { InstanceHistory } from "./InstanceHistory"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown,faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react";
import axios from "axios";
import { connect, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AiOutlineFilePdf } from "react-icons/ai";
import {showAlert} from '../../AlertLoader/index'
import { OneHistory } from "./OneHistory";
import { icon } from "@fortawesome/fontawesome-svg-core";
export const PdfConversionHistory=()=>{
    const baseUrl=useSelector((state)=>state.baseUrl).backend
    const userInfo=useSelector((state)=>state.userProfile)
    const [historyData,setHistoryData]=useState([])
    const [nextUrl,setNextUrl]=useState(baseUrl + 'api/scanned-files/')
    const getMoreData=async()=>{
        try{
            if(nextUrl===null){
                showAlert('No More History','red')
            }
            else{
                const response = await axios.get(nextUrl,{
                    headers: { 'Authorization': 'Token '+localStorage.getItem('token') }
                });
                setNextUrl(response.data.next)
                setHistoryData(prevData=>[...prevData,...response.data.results])
            }
        }
        catch(error){
            console.log(error)
        }
    }
    const downloadFile=async(instanceFile)=>{
        try{
            const response=await axios.get(instanceFile.file,{
                'Authorization':'Token '+localStorage.getItem('token'),
                responseType:'arraybuffer'
            });
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            const a = document.createElement('a');
            a.style.display = 'none';
            document.body.appendChild(a);
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download =instanceFile.file.split('/').pop();
            a.click();
            window.URL.revokeObjectURL(url);
        }
        catch(error){
            showAlert(error,'red');
            console.log(error)
        }

    }
    useEffect(()=>{
        getMoreData();
    },[])
    return(
        <div className="w-full flex justify-center">
            <OneHistory featureName={'pdfConversion'} getMoreData={getMoreData} historyData={historyData} setHistoryData={setHistoryData} downloadFile={downloadFile}/>
        </div>
    )
};
