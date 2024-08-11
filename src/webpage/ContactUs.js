import React from 'react';
import { MdAddCall } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";import { MdOutlineMail } from "react-icons/md";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';
import {showAlert} from '../components/AlertLoader/index'
import axios from 'axios';
import { useSelector } from 'react-redux';
export const ContactUs = () => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const baseUrl=useSelector((state)=>state.baseUrl).backend
    const defaultCenter = {
      lat: 27.681505372996934,
      lng: 85.32804964028425
    };
  
    const mapStyles = {
      height: '400px',
      width: '400px'
    };
  
    const handleLoad = () => {
      setMapLoaded(true);
      console.log('Map loaded successfully');
    };
  const submitContactUsForm=async(event)=>{
    try{
      event.preventDefault();
      console.log('sklfjasdlf')
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value;
      const description = document.getElementById('message').value.trim();
      const response=await axios.post(baseUrl+'api/contact-form/',{
          name:name,
          email:email,
          subject:subject,
          description:description
      })
      showAlert('We will reach you out shortly.','green')
    }
    catch(error){
      showAlert(error,'red');
      console.log(error)
    }

};
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => {
        error.classList.add('hidden');
    });
}
  return (
<div className="bg-100 flex lg:flex-row flex-col  items-center justify-center lg:gap-60  md:gap-2 overflow-hidden ">
    <div className="bg-white flex  flex-col  rounded-lg justify-center align-center">
        <h2 className="text-3xl font-bold mb-4 tracking-wide mt-16">Contact Us</h2>
          <div id="map" className='mt-16 '>
            <LoadScript googleMapsApiKey="AIzaSyDR-Piy7y9bIfz9HzE_dN_TAXJbM9UtA24">
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={15}
                center={defaultCenter}
                onLoad={handleLoad}
            >
                {mapLoaded && <Marker position={defaultCenter} />}
            </GoogleMap>
            </LoadScript>
        </div>  
         <div className=' mt-7 '>
              <div className=' text-sm flex px-5 gap-4'>
                  <IoLocationSharp className='h-6 w-6'/>
                <p className='hover:underline'>M8JH+M52 Lalitpur, Nepal</p>
              </div>
              <div className=' text-sm flex px-5 gap-4'>
              
               <MdAddCall className='h-6 w-6'/>
                <p className='hover:underline'>+977 9861190705</p>
              </div>
              <div className=' text-sm flex px-5 gap-4'>
                 <MdOutlineMail className='h-6 w-6'/>
                <p className='hover:underline'>xyz@gmail.com</p>
              </div>

              
         </div>
        </div>
        <div>
        <p className="pt-4 tracking-normal text-xl font-semibold">
            Contact us to report a problem, <br></br> 
            clarify any doubts about us,or <br></br>
            just find out more.
            </p>
            <div className=" border-grey border rounded-lg p-8  mt-8 shadow" id="box">
            <form id="contactForm" className="space-y-4 flex flex-col " onSubmit={submitContactUsForm}>
                <div>
                    <input type="text" id="name" name="name" className="mt-1 block w-full border  rounded-md shadow-sm p-2 border-gray-950" placeholder="Your Name" required ></input>
                    <p id="nameError" className="error hidden">Please enter your name.</p>
                </div>
                <div className="flex justify-center items-center gap-2">
                        <div>
                            <input type="email" id="email" name="email" className="mt-1 block w-48 border  rounded-md shadow-sm p-2 border-gray-950" placeholder="Your Email" required></input>
                            <p id="emailError" className="error hidden">Please enter a valid email address.</p>
                        </div>
                        <div>
                             <input type='text' id='subject' placeholder='write a subject' className='mt-1 block w-48 border  rounded-md shadow-sm p-2 border-gray-950'required/>
                            <p id="subjectError" className="error hidden">Please choose a subject.</p>
                        </div>
                </div>
                <div>
                    <textarea id="message" name="message" className="mt-1 block w-full border  rounded-md shadow-sm p-2 border-gray-950" rows="10" placeholder="Write a message" required ></textarea>
                    <p id="messageError" className="error hidden">Please write a message.</p>
                </div>
               {/* <div className="flex items-center">
                    <input type="checkbox" id="terms" name="terms" className="mr-2" required></input>
                    <label htmlFor="terms" className="text-sm">I accept <a href="#" className="text-blue-500 underline">Terms and Conditions</a> and <a href="#" className="text-blue-500 underline">Legal & Privacy</a></label>
                    <p id="termsError" className="error hidden">You must accept the terms.</p>
                </div>*/}
                <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:shadow-red-500/50">Send message</button>
            </form>
        </div>
        </div>

    </div>
  );
};

