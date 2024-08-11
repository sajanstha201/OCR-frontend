import React, { useState } from 'react';
import  aboutimg from '../../src/static/images/concept-landing-page-transfer-concept.png'
import  aboutimg3 from '../../src/static/images/text-files-concept-illustration.png'
import  aboutimg2 from '../../src/static/images/copywriting-social-media-post-content-marketing-internet-commercial-cartoon-character-writing-text-advertising-promotional-strategy.png'
import { GiProgression } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
export const AboutUs = () => {
  return (
    <>
      <div className='flex flex-col  lg:flex-row  justify-between  px-11 gap-16 m-12'>
       <div className='flex flex-col flex-wrap gap-2   lg:w-[2500px]'>
            <p className=''>Welcome to RAN, your trusted partner for converting documents to PDF seamlessly. At RAN, we understand the importance of reliable and efficient document management solutions. Our mission is to empower individuals and businesses with tools that simplify the process of creating, editing, and sharing PDF files</p>
             <h1>
                 Why to choose us
             </h1>
             <div className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Why Choose Us</h2>
                    <p className="mt-4 text-lg text-gray-600">Discover why thousands of users trust us for their document conversion needs.</p>
                </div>
                <div className="mt-20 max-w-lg mx-auto grid gap-10 lg:grid-cols-3 lg:max-w-none">
                    {/* Card 1 */}
                    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                        <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                            <div className='flex justify-center flex-col'>
                                <div className='w-full flex items-center justify-center'>

                                <span className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                                    <GiProgression/>
                                </span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Efficiency</h3>
                                <p className="mt-2 text-base text-gray-600">Convert files from various formats to PDF swiftly and accurately.</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                        <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                            <div>
                            <div className='w-full flex items-center justify-center'>
                                <span className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                                  <MdOutlineSecurity/>
                                </span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Security</h3>
                                <p className="mt-2 text-base text-gray-600">Prioritize the security and confidentiality of your documents.</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                        <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                            <div>
                            <div className='w-full flex items-center justify-center'>
                                <span className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                                    <FaUserCheck/>
                                </span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">User-Friendly</h3>
                                <p className="mt-2 text-base text-gray-600">An intuitive platform that simplifies document management for all users.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
             <ol>
                 <li> <strong>Efficiency:</strong>  Our PDF converter is designed to handle various document formats swiftly and accurately, ensuring your files are converted with precision and speed.</li>
                 <li> <strong>User-Friendly Interface:</strong> We prioritize user experience, providing an intuitive platform that makes converting documents to PDF a breeze, even for those new to digital document management.</li>
                 <li> <strong> Security:</strong> We prioritize the security and confidentiality of your documents. Our platform ensures that your files are handled with the utmost care and protection throughout the conversion process.</li>
             </ol>
             
           <h1>Our Commitment</h1>
             <p>At [Your Company Name], we are committed to innovation and customer satisfaction. Whether you’re a student, professional, or business owner, our goal is to provide you with the tools you need to manage your documents effectively and efficiently.

                           Join thousands of satisfied users who trust [Your Company Name] for their document conversion needs. Experience the ease and reliability of our PDF converter today.</p>
        </div>   

       <div className='w-full flex flex-wrap flex-col gap-11 '>
       <div className='w-full flex items-center justify-center'>
               <img src={aboutimg}  sizes='14' />
               </div>
               <div className='w-full flex items-center justify-center '>

               <img src={aboutimg3}  sizes='14' />
               </div>
               <div className='w-full flex items-center justify-center '>

               <img src={aboutimg2}  sizes='14'/>
               </div>
               
               
        </div>

        </div>
    </>
  );
};
