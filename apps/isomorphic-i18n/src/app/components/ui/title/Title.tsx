import React from 'react'
import {Header} from '@/types'
const Title:React.FC<Header>=({title,description})=> {
  return <>
   <header className="mb-16 headerstandard text-center">
        <div className="layer text-white">
            <h1 className="font-monbold text-white dark:text-white text-xl md:text-3xl 4xl:text-5xl">
                {title}
            </h1>
            <h2 className="text-sm text-white dark:text-white md:text-lg 4xl:text-2xl">
               {description}
            </h2>
        </div>
    </header>
  </>
}

export default Title