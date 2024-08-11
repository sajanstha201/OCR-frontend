import { showAlert } from "../AlertLoader";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
export const ViewExcel=({excelData,name})=>{
    const frontendBaseUrl=useSelector((state)=>state.baseUrl).frontend
    const View=()=>{
            try{
                const newWin=window.open(frontendBaseUrl+'blank');
                const pdfBlob = new Blob([JSON.stringify(excelData)], { type: 'application/pdf' });
                if(pdfBlob){
                    const urlObject = URL.createObjectURL(pdfBlob);
                    newWin.location.href=`/display-excel?file=${encodeURIComponent(urlObject)}&fileName=${encodeURIComponent(name)}`
                    newWin.focus();
                }
            }
        catch(error){
            showAlert(error,'red')
            console.log(error)
        }
    }
    return(
        <Button size='lg' variant='success' className='flex items-center justify-center' onClick={View} style={{width:'150px'}}>View</Button>
    )
}