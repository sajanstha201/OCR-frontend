import { showAlert } from "../../AlertLoader"
import { InstanceHistory } from "./InstanceHistory"
export const OneHistory=({featureName,getMoreData,historyData,setHistoryData,downloadFile})=>{
    const deleteInstance=(instance)=>{
        try{
            const oldList=historyData
            const newList=oldList.filter(item=>item!==instance)
            setHistoryData(newList)
        }
        catch(error){
            showAlert(error,'red')
            console.log(error)
        }

    }
    return(
        <div className="bg-gray-200 w-[80%] rounded-md flex flex-col items-start mt-2 shadow-md">
        <div className={`bg-gray-300  w-full h-[50px] relative items-center justify-between flex shadow-lg`}>
            <div className="absolute left-[10%]">
                Name
            </div>
            <div className="absolute left-[60%] sm:hidden lg:flex">
                Date
            </div>  
        </div>
        <div  className="flex-wrap flex-col w-full">
            {
            // featureName==='imageConversion'?
            // historyData.map((value)=>(<InstanceImageConversionHistory key={value.id} instanceHistoryData={value}/>)):
            historyData.map((value)=>(<InstanceHistory key={value.id} featureName={featureName} instanceHistoryData={value} downloadFile={downloadFile} deleteInstance={deleteInstance}/>))
            }
            <div className="bg-[white] hover:bg-gray-100 font-bold border-b h-10 w-full flex items-center justify-center cursor-pointer " onClick={getMoreData}>
                ...
            </div>
           </div>
    </div>
    )
}