
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faPlusCircle, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';

export const HelpCenter=()=>{
    const [includeHeaderFooter, setIncludeHeaderFooter] = useState(false);
    const [encryptPDF, setEncryptPDF] = useState(false);

    const ConvertToPDFWebJobAPIAsync = (url) => {
        console.log("Convert to PDF clicked.", url);
    };

    const AddToExistingPDF = (url, existingPdf) => {
        console.log("Add to Existing PDF clicked.", url, existingPdf);
    };

    const CreatePDFOnline = (url) => {
        console.log("Create PDF Online clicked.", url);
    };
    return(
        <>



        <div className="bg-gray-100 min-h-screen w-full">
            <header className="container mx-auto py-8 px-4">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-600">PDF Converter Help Center</h1>
            </header>

            <div className="container mx-auto py-8 px-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* Conversion Settings */}
                <section className="card bg-white text-gray-800 p-6 flex flex-col justify-between shadow-lg">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-blue-600">Conversion Settings</h2>
                        <div className="mb-4">
                            <label htmlFor="file-type" className="block font-medium text-gray-700 mb-1">Choose a file type:</label>
                            <select id="file-type" className="form-select">
                                <option value="pdf">PDF</option>
                                <option value="docx">Word Document</option>
                                <option value="xlsx">Excel Spreadsheet</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <input type="checkbox" id="create-bookmarks" className="form-checkbox" />
                            <label htmlFor="create-bookmarks" className="form-label text-gray-700 ml-2">Create tagged bookmarks for each converted web page</label>
                        </div>
                        <div className="mb-4">
                            <input type="checkbox" id="create-pdf-tags" className="form-checkbox" />
                            <label htmlFor="create-pdf-tags" className="form-label text-gray-700 ml-2">Store a structure in the PDF that corresponds to the HTML structure of the web pages</label>
                        </div>
                        <div className="mb-4">
                            <input type="checkbox" id="place-headers-footers" className="form-checkbox" />
                            <label htmlFor="place-headers-footers" className="form-label text-gray-700 ml-2">Place a header and footer on every page</label>
                        </div>
                        <div className="mb-4">
                            <input type="checkbox" id="include-header-footer" className="form-checkbox" checked={includeHeaderFooter} onChange={() => setIncludeHeaderFooter(!includeHeaderFooter)} />
                            <label htmlFor="include-header-footer" className="form-label text-gray-700 ml-2">Include custom header and footer</label>
                        </div>
                        {includeHeaderFooter && (
                            <div id="header-footer-options">
                                <div className="mb-2">
                                    <label htmlFor="header-content" className="block font-medium text-gray-700 mb-1">Header Content:</label>
                                    <textarea id="header-content" className="form-textarea w-full" rows="3"></textarea>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="footer-content" className="block font-medium text-gray-700 mb-1">Footer Content:</label>
                                    <textarea id="footer-content" className="form-textarea w-full" rows="3"></textarea>
                                </div>
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="color-theme" className="block font-medium text-gray-700 mb-1">Color Theme:</label>
                            <select id="color-theme" className="form-select">
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <button onClick={() => ConvertToPDFWebJobAPIAsync("https://example.com")} className=" bg-blue-500 hover:bg-blue-600 text-white w-full py-2 flex items-center justify-center rounded-md">
                            <FontAwesomeIcon icon={faFilePdf} className="mr-2" /> Convert Web Page to PDF
                        </button>
                    </div>
                    <img src="https://via.placeholder.com/300" alt="Section Image" className="section-image mt-4" />
                </section>

                {/* Page Layout */}
                <section className="card bg-white text-gray-800 p-6 flex flex-col justify-between shadow-lg">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-blue-600">Page Layout</h2>
                        <div className="mb-4">
                            <label htmlFor="page-size" className="block font-medium text-gray-700 mb-1">Page Size:</label>
                            <select id="page-size" className="form-select">
                                <option value="A4">A4</option>
                                <option value="Letter">Letter</option>
                                <option value="Legal">Legal</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <input type="checkbox" id="scale-wide-contents" className="form-checkbox" />
                            <label htmlFor="scale-wide-contents" className="form-label text-gray-700 ml-2">Scale wide contents to fit page</label>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="switch-to-landscape" className="block font-medium text-gray-700 mb-1">Switch to Landscape if Scaled Smaller Than:</label>
                            <div className="flex items-center">
                                <input type="number" id="switch-to-landscape" defaultValue="50" className="form-input w-16 mr-2" />
                                <span className="text-gray-700">%</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <button onClick={() => AddToExistingPDF("https://example.com", "existing-pdf.pdf")} className=" bg-blue-500 hover:bg-blue-600 text-white w-full py-2 flex items-center justify-center rounded-md">
                            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> Add to Existing PDF
                        </button>
                    </div>
                    <img src="https://via.placeholder.com/300" alt="Section Image" className="section-image mt-4" />
                </section>

                {/* HTML Conversion Settings */}
                <section className="card bg-white text-gray-800 p-6 flex flex-col justify-between shadow-lg">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-blue-600">HTML Conversion Settings</h2>
                        <div className="mb-4">
                            <label htmlFor="add-watermark" className="block font-medium text-gray-700 mb-1">Add Watermark:</label>
                            <input type="text" id="add-watermark" className="form-input" placeholder="Enter watermark text" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="compression-level" className="block font-medium text-gray-700 mb-1">Compression Level:</label>
                            <select id="compression-level" className="form-select">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <input type="checkbox" id="encrypt-pdf" className="form-checkbox" checked={encryptPDF} onChange={() => setEncryptPDF(!encryptPDF)} />
                            <label htmlFor="encrypt-pdf" className="form-label text-gray-700 ml-2">Encrypt PDF with password</label>
                        </div>
                        {encryptPDF && (
                            <div id="encryption-options">
                                <div className="mb-2">
                                    <label htmlFor="encryption-password" className="block font-medium text-gray-700 mb-1">Password:</label>
                                    <input type="password" id="encryption-password" className="form-input" placeholder="Enter password" />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="encryption-confirm-password" className="block font-medium text-gray-700 mb-1">Confirm Password:</label>
                                    <input type="password" id="encryption-confirm-password" className="form-input" placeholder="Confirm password" />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-auto">
                        <div className="mb-4">
                            <button onClick={() => CreatePDFOnline("https://example.com")} className=" bg-blue-500 hover:bg-blue-600 text-white w-full py-2 flex items-center justify-center rounded-md">
                                <FontAwesomeIcon icon={faCloudDownloadAlt} className="mr-2" /> Create PDF Online
                            </button>
                        </div>
                        <img src="https://via.placeholder.com/300" alt="Section Image" className="section-image mt-4" />
                    </div>
                </section>
            </div>
        </div>
    

        </>
    )
}