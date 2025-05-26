import React from 'react'
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import CookiesTerms from '../../Components/CookiesComponents/CookiesTerms'

const page = () => {
  return (
    <div>
        <BackgroundUi src="News.png" name="cookie"/>
        <CookiesTerms/>
    </div>
  )
}

export default page