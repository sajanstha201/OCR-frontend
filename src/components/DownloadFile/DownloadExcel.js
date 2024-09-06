import * as XLSX from 'xlsx'
import { showAlert } from '../AlertLoader';
export const DownloadExcel=(excelData,name)=>{
    try{
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
        XLSX.writeFile(workbook,name);
    }
    catch(error){
        console.log(error)
        showAlert(error,'red')
        
    }
}