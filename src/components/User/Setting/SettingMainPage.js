import { useState} from "react"
import {AccountUpdate,PasswordAndSecurity} from '.'
export const SettingMainPage=()=>{
    const [component,setComponent]=useState('accountUpdate')
    const renderComponent=()=>{
        switch(component){
            case 'accountUpdate':
                return <AccountUpdate/>
            case 'passwordAndSecurity':
                return <PasswordAndSecurity/>
            default:
                return <AccountUpdate/>
        }
    }
    return(
        <div className="w-full flex flex-col lg:flex-row justify-center min-h-[80vh]">
              <div className="   flex  flex-col items-start bg-gray-200 md:w-ful  lg:w-80 min-h-[100vh">
                 <div className="flex flex-col gap-2 w-full ">
                     <div onClick={()=>{setComponent('accountUpdate')}} className={`${component==='accountUpdate'?'bg-gray-500/80':''} flex justify-center gap-2 mt-5  px-8 py-2 backdrop-blur-lg bg-gray-400/40 hover:bg-gray-500/80 items-center h-16 w-full  text-zinc-900 font-light text-sm`}>  <h5>Account Update</h5> </div>
                     <div onClick={()=>{setComponent('passwordAndSecurity')}} className={`${component==='passwordAndSecurity'?'bg-gray-500/80':''} p-3 flex justify-center gap-2   px-8 py-2 backdrop-blur-lg bg-gray-400/40 hover:bg-gray-500/80 items-center h-16 w-full  text-zinc-900 font-light text-sm`}> <h5>Password and Security</h5> </div>
                 </div>
              </div>
              <div className="w-full  flex ">
                {renderComponent()}        
              </div>
         </div>
    )
}
