import tableExtractionImage from '../static/images/tableExtraction.png'
import pdfConversionImage from '../static/images/pdfConversion.png'
import documentAnalysisImage from '../static/images/documentAnalysis.png'
import { Link } from 'react-router-dom'
export const Home=()=>{
    return(
        <>
    <div class="h-52 w-full flex flex-col justify-center items-center text-center p-4">
        <h1 class="text-3xl md:text-7xl font-bold">One stop <span class="text-[#007bff]">PDF</span> management</h1>   
        <h1 class="text-3xl md:text-7xl font-bold">tools for <span class="text-[#007bff]">You</span></h1>
    </div>
    <div class="w-full h-auto md:h-[55vh]  flex flex-col  md:flex-row items-center gap-10 md:gap-20 justify-center p-4 md:p-0">
        <Link to='/pdf-conversion'  class="no-underline bg-white h-100  w-[50%] md:w-[25%] rounded-lg border-grey-700 border shadow-sm shadow-zinc-700 p-4 flex flex-col justify-center items-center hover:shadow-cyan-500/50">
            <img class="h-20" src={pdfConversionImage} alt="PDF Conversion"></img>
            <h1 class="font-bold text-2xl">PDF Conversion</h1>
            <p class="text-zinc-700 text-sm md:text-base">Use our PDF converter to turn Microsoft Word documents, Excel spreadsheets, and PowerPoint files into PDFs. You can also convert PDFs back to their original formats.</p>
        </Link>
        <Link to='/table-extraction' class="no-underline bg-white h-100  w-[50%]  md:w-[25%] rounded-lg border-zinc-900 border shadow-sm shadow-zinc-700 p-4 flex flex-col justify-center items-center hover:shadow-cyan-500/50">
            <img class="h-20" src={tableExtractionImage} alt="Table Extraction"></img>
            <h1 class="font-bold text-2xl">Table Extraction</h1>
            <p class="text-zinc-700 text-sm md:text-base">Extract data tables from PDFs and save results to CSV, XLS, XLSX, and other formats. With this tool, you can get any statistical data in a convenient format for processing.</p>
        </Link>
        <Link  to='/document-analysis' class="no-underline bg-white h-100 w-[50%]  md:w-[25%] rounded-lg border-zinc-900 border shadow-sm shadow-zinc-700 p-4 flex flex-col justify-center items-center hover:shadow-cyan-500/50">
            <img class="h-20" src={documentAnalysisImage} alt="Document Analysis"></img>
            <h1 class="font-bold text-2xl">Document Analysis</h1>
            <p class="text-zinc-700 text-sm md:text-base">Our innovative, user-friendly, and reliable document analysis tool offers intelligent document conversions, OCR, full API, and workflow automation as per your needs.</p>
        </Link>
    </div>
        </>
    )
}