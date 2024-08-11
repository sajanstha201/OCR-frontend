import { Link } from 'react-router-dom'
import logo from '../../static/images/logo.jpg'
export const NoPageFound=()=>{
    return(
        <div className="bg-gray-100 z-10 w-[100%] h-[120%] absolute top-0">
            <div className="col text-center mt-5  mb-2" >
                <h1 className="fw-bolder">404</h1>
            </div>
            <div className="col text-center mt-5" >
                <p className="fw-bold text-muted fs-6"  >There isn't a RAN pages site here.</p>
            </div>   
            <div className="col text-center flex justify-center mt-5 ">
                <img src={logo} className='w-40 h-40'></img>
            </div>
            <div>
                <Link to="/login" style={{textDecoration:'none'}}>Login</Link>
            </div>
        </div>
    )
}