'use client'
import style from './SocialPlatformMobile1.module.css'
import facebook from '@public/sliderMobile/facebook.png';
import whatsapp from '@public/sliderMobile/whatsapp.png';
import slider from '@public/sliderMobile/slider.jpg'
import Image from 'next/image'

type image={
  photo:any
}


const img:image[]=[
  {photo:slider},
  {photo:slider},
  {photo:slider},
  {photo:slider},
  {photo:slider},
  {photo:slider},
  
]
const SocialPlatformMobile: React.FC =() => {



  return<>
     <div className={`block lg:hidden z-50 ${style.bgGradaint}`}>
          <div className={style.slider}>
            <div className={style.slideTrack}>
              {img.map((item,index)=>
              <div key={index} className={style.slide}>
                <Image src={item.photo} className={`${style.img}`} alt=''/>
              </div>
              )}
         
            </div>
          </div>
      </div>
  </>
}

export default SocialPlatformMobile;
