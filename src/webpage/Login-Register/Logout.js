import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { setIsLogin, setUserInfo } from "../../state/UserInformation/ProfileSlice";
import { showAlert } from "../../components/AlertLoader";
import { usePdfConversionFile,useTableExtractionFile,useDocumentAnalysisFile } from "../../context/AppProvider";
export const Logout=()=>{
    const {pdfConversionFile,setPdfConversionFile}=usePdfConversionFile()
    const {tableExtractionFile,setTableExtractionFile}=useTableExtractionFile()
    const {documentAnalysisFile,setDocumentAnalysisFile}=useDocumentAnalysisFile()
    useEffect(()=>{
       setPdfConversionFile({'inputFiles':[],'result':[]})
        setTableExtractionFile({'inputFiles':[],'result':[]})
        setDocumentAnalysisFile({'inputFiles':[],'result':[]})
    })

    const userInfo={
        username:'',
        email:'',
        first_name:'',
        last_name:'',
        token:'',
        isLogin:false
    }
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(setUserInfo(userInfo));
        dispatch(setIsLogin(false));
        localStorage.removeItem('token')
        showAlert('Logout successfully','red')
    },[])
    return(
        <Navigate to='/'></Navigate>
    )
}