

import { useEffect, useState } from "react";
import axios from "axios";
import {useSelector } from "react-redux";
import {showAlert} from '../../AlertLoader/index'
import { OneHistory } from "./OneHistory";
import * as XLSX from 'xlsx'
export const TableExtractionHistory=()=>{
    const baseUrl=useSelector((state)=>state.baseUrl).backend
    const userInfo=useSelector((state)=>state.userProfile)
    const [historyData,setHistoryData]=useState([])
    const [nextUrl,setNextUrl]=useState(baseUrl + 'api/images/')
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
            const excelData=[]
            instanceFile.table.forEach((value,index)=>{excelData.push(JSON.parse(value))})
            const tableData={};
            excelData.forEach((value,index)=>tableData[index]=value);
            const worksheets=[];
            Object.keys(excelData).map((key)=>{
                const dataArray=Object.values(excelData[key]).map((row)=>row)
                const worksheet=XLSX.utils.aoa_to_sheet(dataArray)
                worksheets.push({name:key,data:worksheet})
            })
            
            const workbook=XLSX.utils.book_new();
            worksheets.forEach((worksheet,i)=>{
                XLSX.utils.book_append_sheet(workbook,worksheet.data,'sheet'+worksheet.name)
            })
            console.log(instanceFile)
            XLSX.writeFile(workbook, userInfo.username+instanceFile.created+".xlsx");
        }
        catch(error){
            showAlert(error,'red')
            console.log(error)
        }

    }
    useEffect(()=>{
        getMoreData();
    },[])
    return(
        <div className="w-full flex justify-center">
            <OneHistory featureName={'tableExtraction'} getMoreData={getMoreData} historyData={historyData} setHistoryData={setHistoryData} downloadFile={downloadFile}/>
        </div>
    )
}