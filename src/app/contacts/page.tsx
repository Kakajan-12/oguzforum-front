import PageHero from "@/components/ui/PageHero";
import ContactsForm from "@/components/contacts/ContactsForm";

const Page = () => {
  return (
    <>
      <PageHero
        title="Contacts"
        subtitle="Connect with our team for inquiries and collaboration."
        image="/header-bg.jpg"
      />
      <ContactsForm />
    </>
  );
};

export default Page;
