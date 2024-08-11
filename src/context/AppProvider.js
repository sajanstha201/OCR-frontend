import React,{ useContext,useState,createContext } from "react";
const PdfConversionContext=createContext();
const TableExtractionContext=createContext();
const DocumentAnalysisContext=createContext();
const ImageConversionContext=createContext();
export const AppProvider=({children})=>{
    const [pdfConversionFile,setPdfConversionFile]=useState({'inputFiles':[],'result':[],'name':''})
    const [tableExtractionFile,setTableExtractionFile]=useState({'inputFiles':[],'result':[],'name':''})
    const [documentAnalysisFile,setDocumentAnalysisFile]=useState({'inputFiles':[],'result':[],'name':''})
    const [imageConversionFile,setImageConversionFile]=useState({'inputFiles':[],'result':[],'name':''})
    return(
        <PdfConversionContext.Provider value={{pdfConversionFile,setPdfConversionFile}}>
            <TableExtractionContext.Provider value={{tableExtractionFile,setTableExtractionFile}}>
                <DocumentAnalysisContext.Provider value={{documentAnalysisFile,setDocumentAnalysisFile}}>
                    <ImageConversionContext.Provider value={{imageConversionFile,setImageConversionFile}}>
                    {children}
                    </ImageConversionContext.Provider>
                </DocumentAnalysisContext.Provider>
            </TableExtractionContext.Provider>
        </PdfConversionContext.Provider>
    );
};
export const usePdfConversionFile=()=>useContext(PdfConversionContext)
export const useTableExtractionFile=()=>useContext(TableExtractionContext)
export const useDocumentAnalysisFile=()=>useContext(DocumentAnalysisContext)
export const useImageConversionFile=()=>useContext(ImageConversionContext)