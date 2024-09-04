import './App.css';
import {Navbar} from './components/Navbars'
import {Route,Routes, useLocation} from 'react-router-dom'
import {Login,Register,Logout, ForgotPassword,OTP} from './webpage/Login-Register'
import { ImageConversion, PdfConversion, TableExtraction } from './components/Features';
import {Home,AboutUs,ContactUs, Feature} from './webpage'
import { useEffect } from 'react';
import DocumentAnalysis from './components/Features/DocumentAnalysis';
import { DisplayExcel, DisplayPdf } from './components/ShowResult';
import {BlankPage,NoPageFound} from './webpage/BlankPage'
import { Profile} from './components/User';
import { SettingMainPage } from './components/User/Setting';
import { HistoryMainPage } from './components/User/History';
import { Support } from './components/User/Support';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './components/Footer/Footer'
import { setIsLogin, setToken, setUserInfo,setPhotoSrc } from './state/UserInformation/ProfileSlice'
import { Testing } from './Testing';
import axios from 'axios';
import { showAlert } from './components/AlertLoader';
function App() {
  const location=useLocation()
  const showResult=location.pathname.startsWith('/display')
  const blankPageActivate=location.pathname.startsWith('/blank')
  const antiNav=location.pathname.startsWith('/anti-nav')
  const userInfo=useSelector((state)=>state.userProfile)
  const dispatch=useDispatch();
  const baseUrl=useSelector((state)=>state.baseUrl).backend
  useEffect(()=>{
    try{
      if(localStorage.getItem('token')){
        dispatch(setToken(localStorage.getItem('token')))
        dispatch(setIsLogin(true))
        const getUserInfo=async()=>{
          try{
            const response=await axios.get(baseUrl+'api/users/get-user-info/',
              {headers:{
              'Authorization':'Token '+localStorage.getItem('token')
            }})
            dispatch(setUserInfo(response.data))

            if(response.data.photo){
              const imageResponse=await axios.get(baseUrl+response.data.photo.substr(1),{responseType: 'arraybuffer'})
              dispatch(setPhotoSrc(URL.createObjectURL(new Blob([imageResponse.data], { type: 'image/png' }))));
            }
          }
          catch(error){
              showAlert(error,'red')
              showAlert('logging out','red')
              localStorage.removeItem('token')
              dispatch(setIsLogin(false))
              dispatch(setToken(''))
          }

        }
        if(!localStorage.getItem('isUserInfoLoaded')){
          getUserInfo();
          localStorage.setItem('isUserInfoLoaded','true')
        }
      }
      window.addEventListener('beforeunload', () => {
        localStorage.removeItem('isUserInfoLoaded')
      });
      
    }
    catch(error){
      console.log(error)
      showAlert(error,'red')
    }
  })
  return (
    <div className="App">
      <div id="alert-container" className='mt-10'></div>
      <div className='blur-box' id='blur-box'>
            <div className='loader-box' id='loader-box'></div>      
      </div>
        <div className='whole-body-outer'>
          <div className='whole-body-inner'>
          {(!showResult&&!blankPageActivate&&!antiNav)&&<Navbar></Navbar>}
          <Routes>
                <Route path='' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/anti-nav/otp' element={<OTP />}/>
                <Route path='/anti-nav/forgot-password' element={<ForgotPassword />}/>
                
                <Route path='/pdf-conversion' element={<PdfConversion/>}/>
                {userInfo.isLogin&&<>
                  <Route path='/table-extraction' element={<TableExtraction/>}/>
                  <Route path='/document-analysis' element={<DocumentAnalysis/>}/>
                  <Route path='/image-conversion' element={<ImageConversion/>}/>
                </>
                }
                <Route path='/display-pdf' element={<DisplayPdf/>}/>
                <Route path='/display-excel' element={<DisplayExcel/>}/>
                <Route path='/blank' element={<BlankPage/>}/>
                <Route path='/about-us' element={<AboutUs/>}/>
                <Route path='/contact-us' element={<ContactUs/>}/>
                <Route path='/feature' element={<Feature/>}/>

                {userInfo.isLogin&&<>
                  <Route path='/user/profile' element={<Profile/>}/>
                  <Route path='/user/history' element={<HistoryMainPage/>}/>
                  <Route path='/user/Setting' element={<SettingMainPage/>}/>
                  <Route path='/user/Support' element={<Support/>}/>
                  <Route path='/user/logout' element={<Logout/>}/>
                </>}

            
                <Route path='/testing' element={<Testing/>}/>
                <Route path="*" element={<NoPageFound/>} />
          </Routes>
          </div>
          {(!showResult&&!blankPageActivate&&!antiNav)&&<Footer/>}
        </div>


    </div>
  );
}

export default App;
