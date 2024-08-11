import { useLocation } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useState,useEffect } from "react";
import * as XLSX from 'xlsx'
import { Card ,Button} from "react-bootstrap";
import { showAlert } from "../AlertLoader";
import { DownloadExcel } from "../DownloadFile/DownloadExcel";
export const DisplayExcel=()=>{
    const [excelData,setExcelData]=useState()
    const loc=useLocation();
    const queryParameters=new URLSearchParams(loc.search)
    const file=queryParameters.get('file')
    const fileName=queryParameters.get('fileName')||'table_extraction.xlsx'
    const [excelName,setExcelName]=useState('')
    useEffect(()=>{
        try{
            const fetchData= async()=>{
                try{
                const response=await axios.get(file)
                const responseData=response.data
                const tableData={};
                responseData.forEach((value,index)=>tableData[index]=value);
                setExcelData(responseData)
                }
                catch(error){
                    showAlert(error,'red')
                    console.log(error)
                }
            }
            fetchData();
        }
        catch(error){
            console.log(error)
        }   
    },[]);
    return (
        <>
        <div id='display-excel'>
            <Card style={{border:'none'}}>
                <Card.Title>
                <h1>Extracted Tables</h1>
                <Button onClick={()=>{DownloadExcel(excelData,fileName)}} variant="success">Download</Button>
                </Card.Title>
                <Card.Body className="d-flex flex-column align-items-center">
                {excelData && Object.keys(excelData).map((key) => (
                    <fieldset style={{width:'60%'}}>
                        <legend>Table {parseInt(key)+1}</legend>
                    <Table key={key} striped bordered hover className="m-5" >
                            <thead>
                            </thead>
                        <tbody>
                            {Object.keys(excelData[key]).map((innerKey) => (
                                <tr key={innerKey}>
                                    {excelData[key][innerKey].map((cell, index) => (
                                        <td key={index} style={{maxWidth:'100px'}}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </fieldset>

                ))}  
                </Card.Body>
            </Card>
        </div>
        </>
    );
}