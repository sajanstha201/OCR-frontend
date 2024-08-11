  import Filepic from '../../src/static/images/a.png'
  import tableExtractionImage from '../static/images/tableExtraction.png'
import pdfConversionImage from '../static/images/pdfConversion.png'
import documentAnalysisImage from '../static/images/documentAnalysis.png'
export const Feature=()=>{
    return(
        <div className='m-5'>
        
          <div className="w-full flex flex-col lg:flex-row md:flex-row items-center   px-3 justify-between gap-5">
               <div className="flex flex-wrap flex-col w-full">
                     <h1 className=' mt-1'>Our <span className="text-blue-600">Featuers</span></h1>
                     <p className="text-gray-600">RAN offers high-quality PDF conversion that preserves the original formatting, images, and text layout. Our platform ensures fast and efficient processing for both single and batch file conversions. With an intuitive, user-friendly interface, anyone can convert files effortlessly without technical expertise. RAN prioritizes data security with advanced encryption to protect your files and maintain confidentiality. Supporting a wide range of file formats, RAN allows seamless conversion between PDFs and Word, Excel, PowerPoint, and image files. Our service integrates smoothly with popular cloud storage options like Google Drive, Dropbox, and OneDrive for easy file management. Enjoy consistent performance across all devices, including desktops, laptops, tablets, and smartphones. Plus, our dedicated customer support team is available 24/7 to assist you with any questions or issues, ensuring a smooth and hassle-free experience</p>
               </div>
               <div>
               <img className=''sizes='30' src="/static/media/a.4d2fb8e12c556a228e55.png" alt="description" />

               </div>
          </div> 
          {/* first part */}



      <div className='w-full flex mt-12   justify-center'>
          <div className=' flex gap-1 mt-10 w-4/6  shadow-lg shadow-gray-800 rounded-lg px-2'>
           <div className='flex w-full  flex-col  flex-wrap'>
            <div className='w-full flex justify-center items-center '>

          <img class="h-20 w-20" src={pdfConversionImage} sizes='30' alt="PDF Conversion"></img>
            </div>
           <h1 class="font-bold text-2xl text-blue-600">PDF Conversion</h1>
           <p class="text-zinc-700 text-sm md:text-base">Use our PDF converter to turn Microsoft Word documents, Excel spreadsheets, and PowerPoint files into PDFs. You can also convert PDFs back to their original formats.</p>
              <ol className='font-semibold text-xl'>
                  <li>High-quality character reconigation</li>
                  <li>Convert PDFs into searchable text</li>
                  <li>Extract text acessablility</li>
              </ol>
           </div>
          </div>
  
        </div>


      <div className='w-full flex   justify-center'>
          <div className=' flex gap-1 mt-10 w-4/6  shadow-lg shadow-gray-800 rounded-lg px-2'>
          <div className='flex w-full  flex-col  flex-wrap'>
            <div className='w-full flex justify-center items-center '>

          <img class="h-20 w-20" src={tableExtractionImage} sizes='30' alt="PDF Conversion"></img>
            </div>
           <h1 class="font-bold text-2xl text-blue-600">Table Extraction</h1>
           <p class="text-zinc-700 text-sm md:text-base">Extract data tables from PDFs and save results to CSV, XLS, XLSX, and other formats. With this tool, you can get any statistical data in a convenient format for processing.</p>
            
              <ol className='font-semibold text-xl  '>
                  <li>High-quality character reconigation</li>
                  <li>Convert PDFs into searchable text</li>
                  <li>Extract text acessablility</li>
              </ol>
           </div>
          </div>
  
        </div>

      <div className='w-full flex   justify-center mb-11'>
          <div className=' flex gap-1 mt-10 w-4/6  shadow-lg shadow-gray-800 rounded-lg px-2'>
          <div className='flex w-full  flex-col  flex-wrap'>
            <div className='w-full flex justify-center items-center '>

          <img class="h-20 w-20" src={documentAnalysisImage} sizes='30' alt="PDF Conversion"></img>
            </div>
           <h1 class="font-bold text-2xl text-blue-600">Document Analysis</h1>
           <p class="text-zinc-700 text-sm md:text-base">Our innovative, user-friendly, and reliable document analysis tool offers intelligent document conversions, OCR, full API, and workflow automation as per your needs.</p>
            
              <ol className='font-semibold text-xl  '>
                  <li>High-quality character reconigation</li>
                  <li>Convert PDFs into searchable text</li>
                  <li>Extract text acessablility</li>
              </ol>
           </div>
          </div>
  
        </div>
        </div>
    )
}