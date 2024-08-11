import { useSelector } from 'react-redux';
import logo_image from '../../static/images/logo.jpg'
import './UserNavbar.css'
import { Link } from 'react-router-dom';
import { Nav,Navbar,Offcanvas} from 'react-bootstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faHistory, faCog, faBell, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
export const UserNavbar=()=>{
    const userInfo=useSelector((state)=>state.userProfile)
    const [showUserOffCanvas,setShowUserOffCanvas]=useState(false)
    return(
      <>
      <Nav>
          <Nav.Link>
              <img
                  src={userInfo.photoSrc}
                  alt="User DP"
                  className="user-dp"
                  id="user-dp1"
                  onClick={()=>setShowUserOffCanvas(true)}
              />
          </Nav.Link>
      </Nav>
      <Offcanvas show={showUserOffCanvas} onHide={()=>setShowUserOffCanvas(false)} placement='end' style={{width:'250px'}}>
          <Offcanvas.Header closeButton className='mb-4'>
            <Offcanvas.Title >
                <Nav.Link>
                    <img
                        src={userInfo.photoSrc}
                        alt="User DP"
                        className="user-dp"
                        id="user-dp1"
                        style={{position:'absolute',left:'45%',top:'0%'}}
                    />
                </Nav.Link>
          </Offcanvas.Title >
          </Offcanvas.Header>
            <Offcanvas.Body>
            <Navbar>
                <Navbar.Toggle></Navbar.Toggle>
                <Navbar.Collapse>
                <Nav className="mr-auto d-flex flex-column w-100 ">
                    <Nav.Link as={Link} to="/user/profile">
                        <FontAwesomeIcon icon={faUser} /> My Profile
                    </Nav.Link>
                    <Nav.Link as={Link} to="/user/history">
                        <FontAwesomeIcon icon={faHistory} /> My History
                    </Nav.Link>
                    <Nav.Link as={Link} to="/user/setting">
                        <FontAwesomeIcon icon={faCog} /> Settings
                    </Nav.Link>
                    <Nav.Link as={Link} to="/user/support">
                        <FontAwesomeIcon icon={faQuestionCircle} /> Support
                    </Nav.Link>
                    <Nav.Link as={Link} to="/user/logout">
                        <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
          </Offcanvas.Body>
      </Offcanvas>
      </>
    );
}