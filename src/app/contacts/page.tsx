import React from 'react'
import BackgroundUi from "@/app/BackgroundUI/BackgroundStatic";
import ContactsForm from '@/app/Components/ContactsFormComponents/ContactsForm'

const page = () => {
  return (
    <div>
        <BackgroundUi src="Contacts.webp" name="contacts" />
        <ContactsForm/>
    </div>
  )
}

export default page