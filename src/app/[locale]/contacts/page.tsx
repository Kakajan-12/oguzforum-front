import React from 'react'
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import ContactsForm from '../../Components/ContactsFormComponents/ContactsForm'

const page = () => {
  return (
    <div>
        <BackgroundUi src="Contacts.png" name="contacts" />
        <ContactsForm/>
    </div>
  )
}

export default page