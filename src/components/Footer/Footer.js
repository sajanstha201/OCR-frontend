import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay, faApple, faTiktok, faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
function Footer(){
    const loc=useLocation()
    const path=['/login','/register']
    const isactive=path.includes(loc.pathname)
    if(isactive){
        return null;
    }
    return(
        <>
        <footer class="bg-body-tertiary py-10  min-top-[100%] w-full">
        <div class="container mx-auto flex  flex-wrap gap-16   items-center-center justify-evenly w-full tex">

            <div class="flex justify-centers gap-16 md:gap-40 lg:gap-52" >

                <div class="flex flex-col gap-2">
                    <h1 class="text-blue-500  font-bold text-2xl">RAN</h1>
                    <Link to='/' class="text-md text-black no-underline">Home</Link>
                    <Link to='/feature' class="text-md  text-black no-underline">Feature</Link>
                    <Link to='/' class="text-md text-black no-underline">FAQ</Link>
                    </div>
                    <div class="flex flex-col gap-2">
                    <h1 class="text-blue-500  font-bold text-2xl">PRODUCT</h1>
                    <Link to='/' class="text-md text-black no-underline">Desktop App</Link>
                    <Link to='/' class="text-md  text-black no-underline">Mobile App</Link>
                    <Link to='/' class="text-md text-black no-underline">Developers</Link>
                    </div>
                </div>
            <div class="flex justify-centers gap-16 md:gap-40 lg:gap-52">
                <div class="flex flex-col gap-2">
                        <h1 class="text-blue-500  font-bold text-2xl">SOLUTIONS</h1>
                        <Link to='/' class="text-md text-black no-underline">Business</Link>
                        <Link to='/' class="text-md  text-black no-underline">Education</Link>
                        </div>
                <div class="flex flex-col gap-2">
                        <h1 class="text-blue-500  font-bold text-2xl">COMPANY</h1>
                        <Link to='/' class="text-md text-black no-underline">Our Story</Link>
                        <Link to='/' class="text-md  text-black no-underline">Blogs</Link>
                        <Link to='/contact-us' class="text-md text-black no-underline">Contact</Link>
                    </div>
                </div>
            </div>

        <div class="flex  justify-center  w-full  items-center mt-10  gap-10 lg:gap-36  px-4">
        <div className="flex lg:space-x-4">
                <FontAwesomeIcon icon={faGooglePlay} className="h-6 lg:h-10 w-20 lg:w-30" />
                <FontAwesomeIcon icon={faApple} className="h-6 lg:h-10 w-20 lg:w-30" />
            </div>

            <div className="flex space-x-1 md:space-x-2 lg:space-x-4">
                <FontAwesomeIcon icon={faTiktok} className="h-6 lg:h-8 w-6 lg:w-8" />
                <FontAwesomeIcon icon={faFacebook} className="h-6 lg:h-8 w-6 lg:w-8" />
                <FontAwesomeIcon icon={faCircle} className="h-6 lg:h-8" /> {/* Example of a solid icon */}
                <FontAwesomeIcon icon={faLinkedin} className="h-6 lg:h-8" />
                <FontAwesomeIcon icon={faInstagram} className="h-6 lg:h-8 w-6 lg:w-8" />
            </div>
        </div>
    </footer>
    </>
    )
}
export default Footer