import { showAlert } from "../AlertLoader";
export const DownloadPDF=(pdfBlob,name)=>{
    try{
        const a = document.createElement('a');
        a.style.display = 'none';
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(pdfBlob);
        a.href = url;
        a.download =name;
        a.click();
        window.URL.revokeObjectURL(url);
    }
    catch(error){
        showAlert(error,'red');
        console.log(error)
    }
}