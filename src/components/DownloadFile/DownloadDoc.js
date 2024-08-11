import { showAlert,activate_loader } from "../AlertLoader";
export const DownloadDoc=(docBlob,name)=>{
    try{
        activate_loader(true)
        const a = document.createElement('a');
        a.style.display = 'none';
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(docBlob);
        a.href = url;
        a.download =name;
        a.click();
        window.URL.revokeObjectURL(url);
    }
    catch(error){
        showAlert(error,'red')
        console.log(error)
    }
    finally{
        activate_loader(false)
    }
}