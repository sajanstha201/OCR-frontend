import { useState } from "react"
import { Report,Suggestion } from "."
import { Button } from "react-bootstrap"
export const FeedBack=()=>{
    const [isIssueActivate,setIsIssueAcitvate]=useState(true)
    return(
        <div className="w-full bg-gray-100">
            <div>
            <h1 className="ms-5">Feedback</h1>
    <div className="d-flex container alert col-9 ms-5">
        {isIssueActivate&&<p className="ms-3 text-danger rounded-3 text-start m-0 p-0">Report bugs every time you encounter problems to help us solve themfaster.</p>}

        {!isIssueActivate&&<p className="ms-3 text-success rounded-3 text-start m-0 p-0">Any suggestion so that we can improve our services.</p>}
       
    </div>
            </div>
            {/*<Button className="mr-5" onClick={()=>setIsIssueAcitvate(true)}>Report</Button>
            <Button onClick={()=>setIsIssueAcitvate(false)}>Suggestion</Button>
           
            {!isIssueActivate&&<Suggestion/>}*/}
             {isIssueActivate&&<Report/>}
        </div>
    )
}