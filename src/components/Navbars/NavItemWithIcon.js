import { Nav} from "react-bootstrap"
import { Link } from "react-router-dom"
export const NavItemWithIcon=({to,icon,currentPath,children})=>{
    return(
        <Nav.Link as={Link} to={to} className="p-0 ml-4" >
            <div className={`${to==currentPath.pathname?'font-bold':''} flex flex-col items-center  rounded-t-lg p-2`}>
            <span className="h-5">{icon}</span>
            {children}
            </div>
        </Nav.Link>
    )
}