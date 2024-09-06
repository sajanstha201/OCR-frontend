import logo_image from '../../static/images/logo.jpg'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {UserNavbar} from './UserNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Navbar as NavbarB,Nav,Container } from 'react-bootstrap';
import { AiOutlineFilePdf, AiOutlineTable, AiOutlineFileText, AiOutlinePicture } from 'react-icons/ai';
import { NavItemWithIcon } from './NavItemWithIcon';
export const Navbar=()=>{
    const userInfo=useSelector((state)=>state.userProfile)
    const loc=useLocation()
    const path=['/login','/register','display-excel','display-pdf']
    const isactive=path.includes(loc.pathname)
    if(isactive){
        return null;
    }
    return(
    <NavbarB bg="dark" expand="lg" className="bg-body-tertiary shadow-sm p-0" >
        <Container  fluid>
            <NavbarB.Brand as={Link} to="/" style={{marginRight:'50px'}}>
                <img
                    src={logo_image}
                    alt="Logo"
                    width="80"
                    height="80"
                    className="d-inline-block align-top"
                />{' '}
            </NavbarB.Brand>
            <NavbarB.Toggle aria-controls="basic-navbar-nav" />
            <NavbarB.Collapse id="basic-navbar-nav" >
                <Nav className="me-auto" >
                    <NavItemWithIcon to={'/pdf-conversion'} icon={<AiOutlineFilePdf/>} currentPath={loc}>Image to Pdf</NavItemWithIcon>
                    {userInfo.isLogin&&(<>
                        <NavItemWithIcon to={'/table-extraction'} icon={<AiOutlineTable/>} currentPath={loc}>Table Extraction</NavItemWithIcon>
                        <NavItemWithIcon to={'/document-analysis'} icon={<AiOutlineFileText/>} currentPath={loc}>Image to Word</NavItemWithIcon>
                        <NavItemWithIcon to={'/image-conversion'} icon={<AiOutlinePicture/>} currentPath={loc}>Pdf to Image</NavItemWithIcon>
                    </>
                    )}
                <NavItemWithIcon to={'/about-us'} icon={<FontAwesomeIcon icon={ faInfoCircle} />} currentPath={loc}>About Us</NavItemWithIcon>
                <NavItemWithIcon to={'/contact-us'} icon={<FontAwesomeIcon icon={faEnvelope} />} currentPath={loc}>Contact Us</NavItemWithIcon>
                </Nav>
                {!userInfo.isLogin && (
                    <Nav>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
                    </Nav>
                )}
                {userInfo.isLogin && (
                    <>
                    <UserNavbar></UserNavbar>
                    </>
                    )}
            </NavbarB.Collapse>
        </Container>
    </NavbarB>
    )
}