import { useLocation } from 'react-router-dom'
import './DisplayPdf.css'
export const DisplayPdf=()=>{
    const loc=useLocation();
    const queryParameters=new URLSearchParams(loc.search)
    const file=queryParameters.get('file')
    console.log('url file information',file)
    return(
        <div className='display-pdf-container'>
            <embed src={file}>
            </embed>
        </div>
    )
}