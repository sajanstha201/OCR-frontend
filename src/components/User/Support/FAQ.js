import React, { useState } from 'react';
export const FAQ=()=>{
    const faqs = [
        { question: "What is a PDF Converter?", answer: "A PDF Converter is a software tool or online service that allows you to convert files from various formats (e.g., Word, Excel, JPEG) into PDF format, or vice versa." },
        { question: "Why would I need a PDF Converter?", answer: "PDFs are widely used for their portability and compatibility across different platforms. Converting files to PDF format ensures that your documents retain formatting and are easily shared and viewed by others." },
        { question: "How do I use a PDF Converter?", answer: "Using a PDF Converter typically involves uploading your file to the converter tool, selecting the desired output format (e.g., PDF to Word or Word to PDF), and then initiating the conversion process. Most converters guide you through these steps with user-friendly interfaces." },
        { question: "Can I convert scanned documents into PDF format?", answer: "Yes, many PDF converters support Optical Character Recognition (OCR) technology, which allows you to convert scanned documents (images) into editable PDFs." },
        { question: "Are PDF Converters safe to use?", answer: "Yes, reputable PDF converters prioritize user security and data privacy. However, it's essential to use converters from trusted sources and be cautious with sensitive information." },
        { question: "Do I need to download software to use a PDF Converter?", answer: "Not necessarily. Many PDF converters are available online as web-based tools, eliminating the need for downloading software. Some converters also offer desktop applications for offline use." },
        { question: "Are there free PDF Converter options available?", answer: "Yes, there are several free PDF converters available online. However, the features and conversion limits may vary compared to paid versions. Evaluate based on your specific needs." },
        { question: "Can PDF Converters handle large files?", answer: "Most PDF converters have file size limitations. Check the converter’s specifications to ensure your file size is within the supported range. Some converters offer premium versions for larger files." },
        { question: "What file formats can be converted to PDF?", answer: "Common file formats that can be converted to PDF include Word documents (DOC/DOCX), Excel spreadsheets (XLS/XLSX), PowerPoint presentations (PPT/PPTX), images (JPEG, PNG, TIFF), and more." },
        { question: "Is there technical support available for PDF Converters?", answer: "Reputable PDF converter providers usually offer customer support through FAQs, tutorials, email support, or live chat for troubleshooting and assistance." },
        { question: "Can I convert PDF files back into other formats?", answer: "Yes, many PDF converters support converting PDF files back into editable formats like Word, Excel, or images depending on the converter’s capabilities." },
        { question: "Are there limits to how many files I can convert using a PDF Converter?", answer: "Free versions of PDF converters may have limits on the number of files or the file size you can convert within a given period. Paid versions often offer higher limits or unlimited conversions." },
        { question: "How accurate are the conversions done by PDF Converters?", answer: "The accuracy of conversions depends on the quality of the converter and the complexity of the document. Text-based conversions (e.g., Word to PDF) generally maintain high accuracy, while complex layouts or images may require more advanced tools." },
        { question: "Can PDF Converters preserve hyperlinks and formatting?", answer: "Yes, reputable PDF converters strive to preserve hyperlinks, fonts, images, and formatting during the conversion process to ensure the document looks as close as possible to the original." },
        { question: "Do PDF Converters work on mobile devices?", answer: "Yes, many PDF converters offer mobile-friendly versions or apps that allow you to convert files directly from your smartphone or tablet." }
    ];
    
    const FAQItem = ({ index, question, answer, toggleAnswer, isActive }) => (
        <div className="faq-item  pb-4 mb-4">
            <p className="question font-semibold cursor-pointer text-blue-500 mb-2" onClick={() => toggleAnswer(index)}>
                {index + 1}. {question}
            </p>
            {isActive && <p className="answer text-gray-600">{answer}</p>}
        </div>
    );
    
    
        const [activeIndex, setActiveIndex] = useState(null);
    
        const toggleAnswer = (index) => {
            setActiveIndex(activeIndex === index ? null : index);
        };
    return(
        <>

        <div className="bg-gray-100 max-w-screen- mx-auto bg-white p-6 rounded-lg mt-3 flex">
            <div className='w-96'>

            <h1 className="text-center text-blue-500 text-3xl mb-8">FAQs for PDF Converter</h1>
            {faqs.map((faq, index) => (
                <FAQItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
                toggleAnswer={toggleAnswer}
                isActive={activeIndex === index}
                />
            ))}
            </div>
        </div>
    



        </>
    )
}