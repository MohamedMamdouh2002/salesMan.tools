'use client';
import Image from 'next/image'
import style from'./Footer.module.css'
import facebook from '../../../../public/footer/facebook.png';
import facebookHover from '../../../../public/footer/facebookHover.png';
import twitter from '../../../../public/footer/twitter.png';
import twitterHover from '../../../../public/footer/twitterHover.png';
import instagram from '../../../../public/footer/instagram.png';
import instagramHover from '../../../../public/footer/instgramHover.png';
import linkedin from '../../../../public/footer/linkedin.png';
import linkedinHover from '../../../../public/footer/linkedinHover.png';
import mail from '../../../../public/footer/mail.svg';
import support from '../../../../public/footer/Support.svg';
import call from '../../../../public/footer/call.svg';
import chat from '../../../../public/footer/chat.svg';
import image0 from '../../../../public/footer/0.svg';
import image1 from '../../../../public/footer/1.png';
import image2 from '../../../../public/footer/2.svg';
import image3 from '../../../../public/footer/3.svg';
import image4 from '../../../../public/footer/4.svg';
import egypt from '../../../../public/footer/egypt.jpg';
import imge from '@public/assets/hero.png'
import Link from 'next/link';
import { useState } from 'react';


type image ={

  photo:any,
}
const img :image[]=[
  {photo:image0},
  {photo:image1},
  {photo:image2},
  {photo:image3},
  {photo:image4},
]
function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  return <>
    <div className='footer font-montserrat relative  bg-mainBg dark:bg-[#1C1C1C]  pt-8 md:pt-16  md:px-[40px] 4xl:px-0 pb-[150px] md:pb-4 flex flex-row items-center justify-center text-white'>
      <div className='md:w-9/12 w-11/12  4xl:w-9/12'>
        <div className='flex flex-col lg:flex-row justify-between items-start'>
          <div className='flex flex-col text-white items-start w-full lg:w-auto  border-b-[1px]  border-solid lg:!border-none border-[#e0e0e031] pt-[50px] md:!pt-0'>
            <div className='flex flex-row  items-center w-full  text-white justify-between  mt-[10px]  md:mt-[0px]'>
              <p className="text-[13px] dark:text-white text-white 4xl:text-4xl md:text-lg h-[21px]  capitalize  font-normal mb-4 md:mb-[14px]">
                About Sales Manss
              </p>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/about">
                <p className='cursor-pointer text-[13px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA] '>
                  About Us
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/our-services">
                <p className='cursor-pointer text-[13px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA] '>
                  Our Services
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/social-responsibilities">
                <p className='cursor-pointer text-[13px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA] '>
                  Social Responsibility
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/find-us">
                <p className='cursor-pointer text-[13px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA] '>
                  Find Us
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/media-center">
                <p className='cursor-pointer text-[13px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA] '>
                  Media Center
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/careers">
                <p className='cursor-pointer text-[13px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA] '>
                  Careers
                </p>
              </a>
            </div>
          </div>
          <div className='flex flex-col text-white items-start w-full lg:w-auto  border-b-[1px]  border-solid lg:!border-none border-[#e0e0e031] '>
            <div className='flex flex-row  items-center w-full  justify-between  mt-4  md:mt-0 lg:w-auto'>
              <p className="text-[12px] text-white 4xl:text-4xl md:text-lg h-[21px]  capitalize  font-normal mb-4 md:mb-[14px]">
                Auctions
              </p>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/motors?category=Vehicles">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  Vehicles
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/motors?category=Machinery">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  Machineries
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/plans?etisalat=vip-plans&auction=online">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  Premium Packages
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/surplus?category=police">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  General Items
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/properties">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  Properties
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/for-rent">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  For Rent
                </p>
              </a>
            </div>
          </div>
      
          <div className='flex flex-col text-white items-start w-full lg:w-auto  border-b-[1px]  border-solid lg:!border-none border-[#e0e0e031] '>
            <div className='flex flex-row  items-center w-full  justify-between  mt-4  md:mt-0 lg:w-auto'>
              <p className="text-[12px] text-white 4xl:text-4xl md:text-lg h-[21px]  capitalize  font-normal mb-4 md:mb-[14px]">
                Help Center
              </p>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/help">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  Help
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/faqs">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  FAQ
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/contact-us">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  Contact Us
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/help?href=How_To_Use">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  Help Guide
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/feedback">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  Feedback
                </p>
              </a>
            </div>
          </div>
          <div className='flex flex-col text-white items-start w-full lg:w-auto  border-b-[1px]  border-solid lg:!border-none border-[#e0e0e031] '>
            <div className='flex flex-row  items-center w-full  justify-between  mt-4  md:mt-0 lg:w-auto'>
              <p className="text-[12px] text-white 4xl:text-4xl md:text-lg h-[21px]  capitalize  font-normal mb-4 md:mb-[14px]">
                Quick Links
              </p>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/sell-your-vehicle">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  Sell your vehicle
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/our-fleet">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  Our Fleet
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/myLists/requests">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  Request Plate
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/myLists/requests">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  Request Package
                </p>
              </a>
            </div>
            <div className={style.footerLinkWrapper}>
              <a className={style.footerLink} rel="noreferrer" href="/myLists/requests">
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-[0px] capitalize opacity-[0.7] text-[#F5F7FA]'>
                  Request #Tag
                </p>
              </a>
            </div>
          </div>
        </div>
        <hr className={style.divider}/>
        <div className='flex flex-col lg:flex-row justify-between items-start mt-[10px] md:mt-[36.3px] pb-0 md:pb-6'>
          <div className='flex  flex-col gap-[10px]  xl:gap-[80px]'>
            <h1 className='text-white'>Sales Man</h1>
           
            <div>
              <p className='text-[12px] text-white  md:text-[15px] font-semibold md:font-normal 4xl:text-xl mb-5  capitalize'>Get in Touch</p>
              <div className='mb-[30px] flex flex-row w-full  lg:w-[90%] xl:w-full flex-wrap gap-y-[10px] gap-x-[8px] md:mb-0'>
                {/* <Link href="https://www.facebook.com/emiratesauction" target="_blank">
                  <Image className='w-[29px] h-[29px] xl:w-[39px] xl:h-[39px] 4xl:w-[60px] 4xl:h-[60px]'
                    onMouseEnter={() => setHoveredLink('facebook')} onMouseLeave={() => setHoveredLink(null)} src={hoveredLink === 'facebook' ? facebookHover : facebook}
                    alt="Facebook" title="Follow with Facebook" loading="lazy" style={{ borderRadius: "50%" }}
                  />
                </Link>

                <Link href="https://twitter.com/emiratesauction" target="_blank">
                  <Image className='w-[29px] h-[29px] xl:w-[39px] xl:h-[39px] 4xl:w-[60px] 4xl:h-[60px]'
                    onMouseEnter={() => setHoveredLink('twitter')} onMouseLeave={() => setHoveredLink(null)} src={hoveredLink === 'twitter' ? twitterHover : twitter}
                    alt="Twitter" title="Follow with Twitter" loading="lazy" style={{ borderRadius: "50%" }}
                  />
                </Link>

                <Link href="https://www.instagram.com/emiratesauction" target="_blank">
                  <Image className='w-[29px] h-[29px] xl:w-[39px] xl:h-[39px] 4xl:w-[60px] 4xl:h-[60px]'
                    onMouseEnter={() => setHoveredLink('instagram')} onMouseLeave={() => setHoveredLink(null)} src={hoveredLink === 'instagram' ? instagramHover : instagram}
                    alt="Instagram" title="Follow with Instagram" loading="lazy" style={{ borderRadius: "50%" }}
                  />
                </Link>

            

                <Link href="https://www.linkedin.com/company/emirates-auction" target="_blank">
                  <Image className='w-[29px] h-[29px] xl:w-[39px] xl:h-[39px] 4xl:w-[60px] 4xl:h-[60px]'
                    onMouseEnter={() => setHoveredLink('linkedin')} onMouseLeave={() => setHoveredLink(null)} src={hoveredLink === 'linkedin' ? linkedinHover : linkedin}
                    alt="LinkedIn" title="Follow with LinkedIn" loading="lazy" style={{ borderRadius: "50%" }}
                  />
                </Link> */}
<ul className="wrapper">
  <li className="icon facebook">
    <span className="tooltip">Facebook</span>
    <svg
      viewBox="0 0 320 512"
      height="1.2em"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
      ></path>
    </svg>
  </li>
  <li className="icon twitter">
    <span className="tooltip">Twitter</span>
    <svg
      height="1.8em"
      fill="currentColor"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className="twitter"
    >
      <path
        d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
      ></path>
    </svg>
  </li>
  <li className="icon instagram">
    <span className="tooltip">Instagram</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1.2em"
      fill="currentColor"
      className="bi bi-instagram"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
      ></path>
    </svg>
  </li>
</ul>


               
              </div>
            </div>
          </div>
          <div className={style.supportStack}>
            <p className='text-[15px] text-white 4xl:text-2xl font-normal  capitalize mb-[12px]'>
              Need help? Weare here to help you 24/7
            </p>
            <div className={style.supportLinkWithMargin} style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
              <p className=' cursor-pointer text-[12px] 4xl:text-lg md:text-[14.1px] font-semibold md:font-normal mb-auto   opacity-[0.7] text-[#F5F7FA]'>
                <span className='text-[#F5F7FA]'>Reach out to us anytime via the following methods:</span>
              </p>
            </div>
            <div className={style.supportLink} style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
              <Image src={mail} alt="cs@mazadmasr.com" width="19" height="26"
              loading="lazy" rel="preload" />
              <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-auto   opacity-[0.7] text-[#F5F7FA] '>
                <span className='text-[#F5F7FA]'>cs@mazadmasr.com</span>
              </p>
            </div>
            <div className={style.supportLink} style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
              <Image src={support} alt="Help" width="19" height="26"
              loading="lazy" rel="preload" />
              <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-auto   opacity-[0.7] text-[#F5F7FA] '>
                <span className='text-[#F5F7FA]'>Help</span>
              </p>
            </div>
            <div className={style.supportLink} style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
              <Image src={call} alt="phone Number" width="19" height="26"
              loading="lazy" rel="preload" />
              <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-auto   opacity-[0.7] text-[#F5F7FA] '>
                <span dir="ltr" className='text-[#F5F7FA]'>+971 600 54 54 54</span>
              </p>
            </div>
            <div className={style.footerLink} >
              <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                <Image src={chat} alt="Chat Now" width="19" height="26"
                loading="lazy" rel="preload" />
                <p className='cursor-pointer text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-auto   opacity-[0.7] text-[#F5F7FA] '>
                  <span dir="ltr" className='text-[#F5F7FA]'>Chat Now</span>
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center md:items-start justify-center'>
            {/* <p className='text-[12px] 4xl:text-xl md:text-[15px] font-semibold md:font-normal mb-5  font-normal capitalize'>Download Our App</p>
            <div className='flex flex-row-reverse md:flex-row justify-center  md:justify-start gap-[20px]' style={{ alignItems: 'center' }}>
              <div className={style.qrImage}>
                <span className={style.spanQR}>
                  <span className={style.spanCover}>
                    <Image src={qrCover} alt="QR Cover" aria-hidden="true" />
                  </span>
                  <Image className={style.qrCode} src={qr} alt="qr" decoding="async" data-nimg="intrinsic" />
                </span>
              </div>
              <div className='flex flex-col gap-[8px]'>
                <Link href="https://apps.apple.com/ae/app/emirates-auction/id473718109" target="_blank">
                  <Image className='w-[107px] h-[31px] md:h-[38px] md:w-full max-w-[128px]' 
                  src={apple} alt="footer" loading="lazy" rel="preload" />
                </Link>
                <Link href="https://play.google.com/store/apps/details?id=com.ea.emiratesauction&hl=en&gl=US" target="_blank">
                  <Image className='w-[107px] h-[31px] md:h-[38px] md:w-full max-w-[128px]' 
                  src={google} alt="footer" loading="lazy" rel="preload" />
                </Link>
                <Link href="https://appgallery.huawei.com/app/C100850145" target="_blank">
                  <Image className='w-[107px] h-[31px] md:h-[38px] md:w-full max-w-[128px]' 
                  src={huawei} alt="footer" loading="lazy" rel="preload" />
                </Link>
              </div>
            </div> */}
            <Image src={imge} alt='' width={200} height={200}/>
          </div>
        </div>
        <div className='mt-[24px] md:mt-0 border-[#E0E0E0] border-t-[1px] border-solid opacity-[0.3]'></div>
        <div className=' flex flex-row justify-between  w-full md:w-auto items-center flex-wrap pb-4 md:pb-5 mt-4 md:mt-5'>
          <p className=' text-xs md:text-[14px] font-semibold text-[#f5f7fa] absolute lg:relative top-[98%] left-[25%] right-[25%]  lg:right-0 lg:left-0 w-[50%] lg:w-[90%] xl:w-auto md:bottom-[5%] flex flex-row items-center justify-center text-center'>
            2024 © salesman
          </p>
          <div className='flex flex-row gap-x-[8px] w-full lg:w-auto  justify-between lg:justify-start items-center pb-4 lg:pb-0 pt-0  px-0  border-t-1 !border-b-[1px] border-[#e0e0e04d] border-solid lg:border-none'>
          {img.map((i,index)=>
            <Image key={index} src={i.photo} alt="0" loading="lazy" rel="preload"
            className='paymentImages w-[44px] h-[17px]  md:w-[64px] md:h-[24px]' />
          )}
           
          </div>
          <div className='flex flex-row mt-[11px] mb-[11px] lg:mb-0  lg:mt-auto justify-around lg:justify-start w-full lg:w-auto gap-8 items-center'>
            <Link className={style.footerLink} rel="noreferrer" href="/sitemap">
              <p className='text-[12px] md:text-[13px] font-semibold text-[#f5f7fa] cursor-pointer flex items-center!w-auto mx-0'>
                Sitemap
              </p>
            </Link>
            <Link className={style.footerLink} rel="noreferrer" href="/terms-and-conditions">
              <p className='text-[12px] md:text-[13px] font-semibold text-[#f5f7fa] cursor-pointer flex items-center!w-auto mx-0'>
                Terms and Conditions
              </p>
            </Link>
            <p className='text-[12px] md:text-[13px] font-semibold text-[#f5f7fa] cursor-pointer flex items-center!w-auto mx-0'>
              <div>
                {/* <span className={style.footerLink}>
                  </span> */}
                {/* <Image/> */}
                  <Image src={egypt} alt="Arabic Language" title="Switch to Arabic language"
                  width={50} height="18"   />
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Footer