import React from 'react'
import BackgroundUi from "@/app/BackgroundUI/BackgroundStatic";
import CookiesTerms from '@/app/Components/CookiesComponents/CookiesTerms'

const page = () => {
  return (
    <div>
        <BackgroundUi src="News.webp" name="cookie"/>
        <CookiesTerms/>
    </div>
  )
}

export default page